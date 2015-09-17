import {
  PATCH_STORY
} from '../constants/ActionTypes';
import {
  fetchCraftedStories,
  fetchCraftedStoriesByIssue
} from '../craftperson/story';

export function patchStories(stories) {
  return {
    type: PATCH_STORY,
    payload: {
      stories: stories,
    },
  };
}

export function fetchStories() {
  return (dispatch, getState) => {
    fetchCraftedStories(getState().setting)
      .then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function reloadStory(identifier = {}) {
  return (dispatch, getState) => {
    fetchCraftedStoriesByIssue({
      settings: getState().setting,
      identifiers: [identifier],
    })
      .then((value) => {
        dispatch(patchStories(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}
