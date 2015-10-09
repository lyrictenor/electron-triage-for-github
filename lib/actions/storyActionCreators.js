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
  getSettingDataPromise,
  filterOutputSettings,
} from '../utils/settingData';


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
    getSettingDataPromise()
      .then((value) => {
        const settings = filterOutputSettings(value);
        return fetchCraftedStories(settings);
      }).then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function reloadStory(identifier = {}) {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        const settings = filterOutputSettings(value);
        return fetchCraftedStoriesByIssue({
          settings: settings,
          identifiers: [identifier],
        });
      }).then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function toggleStoryState(identifier = {}) {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        const settings = filterOutputSettings(value);
        return toggleIssuesState({
          settings: settings,
          identifiers: [identifier],
        });
      }).then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function deleteStoryBranch(identifier = {}) {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        const settings = filterOutputSettings(value);
        return deletePullRequestsBranch({
          settings: settings,
          identifiers: [identifier],
        });
      }).then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function mergeStoryPullRequest(identifier = {}) {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        const settings = filterOutputSettings(value);
        return mergePullRequests({
          settings: settings,
          identifiers: [identifier],
        });
      }).then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}
