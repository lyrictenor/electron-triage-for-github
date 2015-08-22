import {
  FETCH_STORY
} from '../constants/ActionTypes';
import { fetchCraftedStories } from '../craftperson/story';

export function fetchStory(stories) {
  return {
    type: FETCH_STORY,
    payload: {
      stories: stories
    }
  };
}

export function fetchStories() {
  return (dispatch, getState) => {
    fetchCraftedStories(getState().setting)
      .then((value) => {
        dispatch(fetchStory(value));
      }).catch((error) => {
        console.error(error);//eslint-disable-line no-console
      });
  };
}
