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
    const newState = [];
    // insert if not exists
    action.payload.stories.forEach((story) => {
      const needle = Array.find(state, (targetStory) => {
        return story.id === targetStory.id;
      });
      if (!needle) {
        newState.push(story);
      }
    });

    // update
    state.forEach((story) => {
      const needle = Array.find(action.payload.stories, (pickStory) => {
        return pickStory.id === story.id;
      });
      if (needle) {
        newState.push(needle);
      } else {
        newState.push(story);
      }
    });
    return newState;
  default:
    return state;
  }
}
