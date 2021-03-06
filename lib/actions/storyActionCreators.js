import {
  PATCH_STORY,
} from '../constants/ActionTypes';
import {
  getConfigAll,
  bulkSetConfig,
  setConfig,
  getConfig,
  tryToLogIn,
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
  toggleIssuesStateByIdentifiers,
  deletePullRequestsBranchByIdentifiers,
  mergePullRequestsByIdentifiers,
  fetchReposAllIssuesByIdentifiers,
} from '../utils/stories';

export function patchStory(story) {
  return {
    type: PATCH_STORY,
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
        if (tryToLogIn(configs)) {
          return fetchIssues(configs);
        }
        return fetchReposAllIssuesByIdentifiers({
          configs: configs,
          identifiers: [{repo: 'example-issues', owner: 'lyrictenor'}],
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

export function toggleStoryState(identifier = {}) {
  return (dispatch) => {
    let configs;
    getConfigAll()
      .then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return toggleIssuesStateByIdentifiers({
          configs: configs,
          identifiers: [identifier],
        });
      }).then(() => {
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

export function deleteStoryBranch(identifier = {}) {
  return (dispatch) => {
    let configs;
    getConfigAll()
      .then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return deletePullRequestsBranchByIdentifiers({
          configs: configs,
          identifiers: [identifier],
        });
      }).then(() => {
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

export function mergeStoryPullRequest(identifier = {}) {
  return (dispatch) => {
    let configs;
    getConfigAll()
      .then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return mergePullRequestsByIdentifiers({
          configs: configs,
          identifiers: [identifier],
        });
      }).then(() => {
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
