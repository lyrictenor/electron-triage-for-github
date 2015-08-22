import {
  FETCH_STORY
} from '../constants/ActionTypes';

export default function (state = undefined, action = {}) {
  if (typeof state === 'undefined') {
    state = initState();
  }
  switch (action.type) {
  case FETCH_STORY:
    return action.payload.stories;
  default:
    return state;
  }
}

function initState() {
  return [];
}
