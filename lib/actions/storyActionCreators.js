import {
  UPDATE_STORY,
} from '../constants/ActionTypes';
import {
  getConfigAll,
  bulkSetConfig,
  setConfig,
  getConfig,
} from '../utils/configs';
import {
  updateAppGlobal,
} from './settingActionCreators';
import {
  DuplicateAutopilotError,
} from '../utils/errors';
import {
  fetchIssues,
  fetchIssuesByIdentifiers,
  fetchPullsByIdentifiers,
  buildIdentifiersForPullsFromIssues,
  fetchStatusesByIdentifiers,
  buildIdentifiersForStatusesFromPulls,
  fetchBranchesByIdentifiers,
  buildIdentifiersForBranchesFromRepos,
} from '../utils/stories';

export function patchStory(story) {
  return {
    type: UPDATE_STORY,
    payload: {
      ...story,
    },
  };
}

export function fetchStories() {
  return (dispatch) => {
    let configs;
    getConfig('autopiloting')
      .then((autopilotingValue) => {
        if (autopilotingValue) {
          return Promise.reject(new DuplicateAutopilotError('Now autopiloting.'));
        }
        return setConfig('autopiloting', true);
      }).then(() => {
        return getConfigAll();
      }).then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return fetchIssues(configs);
      }).then((issuesStory) => {
        dispatch(patchStory(issuesStory));
        return Promise.all([
          fetchPullsByIdentifiers({
            configs: configs,
            identifiers: buildIdentifiersForPullsFromIssues({
              issues: issuesStory.issues,
              issuesById: issuesStory.issuesById,
            }),
          }).then((pullsStory) => {
            dispatch(patchStory(pullsStory));
            return fetchStatusesByIdentifiers({
              configs: configs,
              identifiers: buildIdentifiersForStatusesFromPulls({
                pulls: pullsStory.pulls,
                pullsByKey: pullsStory.pullsByKey,
              }),
            });
          }).then((statusesStory) => {
            dispatch(patchStory(statusesStory));
          }),
          fetchBranchesByIdentifiers({
            configs: configs,
            identifiers: buildIdentifiersForBranchesFromRepos({
              repos: issuesStory.repos,
              reposById: issuesStory.reposById,
            }),
          }).then((branchesStory) => {
            dispatch(patchStory(branchesStory));
          }),
        ]);
      }).then(() => {
        // FIXME: avoid using new Date() directly
        return bulkSetConfig(new Map([
          ['storyUpdatedAt', new Date()],
          ['autopilotedAt', new Date()],
        ]));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
        return Promise.resolve(error);
      }).then((value) => {
        if (!(value instanceof DuplicateAutopilotError)) {
          return setConfig('autopiloting', false);
        }
      }).then(() => {
        return getConfigAll();
      }).then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function reloadStory(identifier = {}) {
  return (dispatch) => {
    let configs;
    getConfigAll()
      .then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return fetchIssuesByIdentifiers({
          configs: configs,
          identifiers: [identifier],
        });
      }).then((issuesStory) => {
        dispatch(patchStory(issuesStory));
        return Promise.all([
          fetchPullsByIdentifiers({
            configs: configs,
            identifiers: buildIdentifiersForPullsFromIssues({
              issues: issuesStory.issues,
              issuesById: issuesStory.issuesById,
            }),
          }).then((pullsStory) => {
            dispatch(patchStory(pullsStory));
            return fetchStatusesByIdentifiers({
              configs: configs,
              identifiers: buildIdentifiersForStatusesFromPulls({
                pulls: pullsStory.pulls,
                pullsByKey: pullsStory.pullsByKey,
              }),
            });
          }).then((statusesStory) => {
            dispatch(patchStory(statusesStory));
          }),
          fetchBranchesByIdentifiers({
            configs: configs,
            identifiers: buildIdentifiersForBranchesFromRepos({
              repos: issuesStory.repos,
              reposById: issuesStory.reposById,
            }),
          }).then((branchesStory) => {
            dispatch(patchStory(branchesStory));
          }),
        ]);
      }).then(() => {
        return setConfig('storyUpdatedAt', new Date());
      }).then(() => {
        return getConfig('storyUpdatedAt');
      }).then((configValue) => {
        dispatch(updateAppGlobal(new Map([['storyUpdatedAt', configValue]])));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}
