import {
  FETCH_STORY,
  PATCH_STORY
} from '../constants/ActionTypes';

function initState() {
  return [];
}

export default function(state = initState(), action = {}) {
  switch (action.type) {
  case FETCH_STORY:
    return action.payload.stories;
  case PATCH_STORY:
    return state;
  default:
    return state;
  }
}
