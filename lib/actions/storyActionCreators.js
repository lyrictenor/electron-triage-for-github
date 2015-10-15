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
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        return fetchCraftedStories(configs);
      }).then((value) => {
        dispatch(patchStories(value));
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
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}
