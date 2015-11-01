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
} from '../utils/stories';

export function patchStories(stories) {
  return {
    type: UPDATE_STORY,
    payload: {
      ...stories,
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
      }).then((value) => {
        dispatch(patchStories(value));
        return fetchPullsByIdentifiers({
          configs: configs,
          identifiers: buildIdentifiersForPullsFromIssues({
            issues: value.issues,
            issuesById: value.issuesById,
          }),
        });
      }).then((value) => {
        dispatch(patchStories(value));
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
      }).then((value) => {
        dispatch(patchStories(value));
        return fetchPullsByIdentifiers({
          configs: configs,
          identifiers: buildIdentifiersForPullsFromIssues({
            issues: value.issues,
            issuesById: value.issuesById,
          }),
        });
      }).then((value) => {
        dispatch(patchStories(value));
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
