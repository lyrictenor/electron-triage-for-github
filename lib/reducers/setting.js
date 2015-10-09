import {
  DO_NOTHING,
  UPDATE_SETTING,
} from '../constants/ActionTypes';

export default function(state = {}, action = {}) {
  switch (action.type) {
  case UPDATE_SETTING:
    return Object.assign(
      {},
      state,
      {
        apiendpoint: action.payload.apiendpoint,
        webendpoint: action.payload.webendpoint,
        token: action.payload.token,
        interval: Number(action.payload.interval),
      }
    );
  case DO_NOTHING:
    return state;
  default:
    return state;
  }
}
