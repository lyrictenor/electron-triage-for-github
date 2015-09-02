import {
  FETCH_STORY
} from '../constants/ActionTypes';

function initState() {
  return [];
}

export default function(state = initState(), action = {}) {
  switch (action.type) {
  case FETCH_STORY:
    return action.payload.stories;
  default:
    return state;
  }
}
