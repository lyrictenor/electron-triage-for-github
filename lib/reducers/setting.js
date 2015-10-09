import {
  DO_NOTHING,
  UPDATE_SETTING,
} from '../constants/ActionTypes';
import buildGithubTokenUrl from '../utils/buildGithubTokenUrl';

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
        tokenUrl: buildGithubTokenUrl(action.payload.webendpoint),
        interval: Number(action.payload.interval),
      }
    );
  case DO_NOTHING:
    return state;
  default:
    return state;
  }
}
