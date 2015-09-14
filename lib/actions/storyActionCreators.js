import {
  FETCH_STORY,
  PATCH_STORY
} from '../constants/ActionTypes';
import {
  fetchCraftedStories,
  fetchCraftedStoriesByIssue
} from '../craftperson/story';

export function fetchStory(stories) {
  return {
    type: FETCH_STORY,
    payload: {
      stories: stories,
    },
  };
}

export function fetchStories() {
  return (dispatch, getState) => {
    fetchCraftedStories(getState().setting)
      .then((value) => {
        dispatch(fetchStory(value));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}

export function patchStories(stories) {
  console.log(stories);// eslint-disable-line no-console
  return {
    type: PATCH_STORY,
    payload: {
      stories: stories,
    },
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
