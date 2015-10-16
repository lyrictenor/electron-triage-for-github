import {
  PATCH_STORY,
} from '../constants/ActionTypes';
import {
  fetchCraftedStories,
  fetchCraftedStoriesByIssue,
  toggleIssuesState,
  deletePullRequestsBranch,
  mergePullRequests,
} from '../craftperson/story';
import {
  getConfigAll,
  bulkSetConfig,
  setConfig,
  getConfig,
} from '../utils/configs';
import {
  updateAppGlobal,
} from './settingActionCreators';

export function patchStories(stories) {
  return {
    type: PATCH_STORY,
    payload: {
      stories: stories,
    },
  };
}

export function fetchStories() {
  return (dispatch) => {
    getConfig('autopiloting')
      .then((autopilotingValue) => {
        // FIXME: this does not prevent refresh many times. only 2 times.
        if (autopilotingValue) {
          return Promise.reject(new Error('Now autopiloting.'));
        }
        return setConfig('autopiloting', true);
      }).then(() => {
        return getConfigAll();
      }).then((configs) => {
        dispatch(updateAppGlobal(configs));
        return fetchCraftedStories(configs);
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
      }).then(() => {
        return setConfig('autopiloting', false);
      }).then(() => {
        return getConfigAll();
      }).then((configs) => {
        dispatch(updateAppGlobal(configs));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function reloadStory(identifier = {}) {
  return (dispatch) => {
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        return fetchCraftedStoriesByIssue({
          configs: configs,
          identifiers: [identifier],
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

export function toggleStoryState(identifier = {}) {
  return (dispatch) => {
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        return toggleIssuesState({
          configs: configs,
          identifiers: [identifier],
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

export function deleteStoryBranch(identifier = {}) {
  return (dispatch) => {
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        return deletePullRequestsBranch({
          configs: configs,
          identifiers: [identifier],
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

export function mergeStoryPullRequest(identifier = {}) {
  return (dispatch) => {
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        return mergePullRequests({
          configs: configs,
          identifiers: [identifier],
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
