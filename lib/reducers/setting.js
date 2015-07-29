import defaultSettings from '../data/default_settings.json';
import {
  DO_NOTHING,
  UPDATE_SETTING
} from '../constants/ActionTypes';
import buildGithubTokenUrl from '../utils/buildGithubTokenUrl';

export default function (state = undefined, action = {}) {
  if (typeof state === 'undefined') {
    state = initState();
  }
  switch (action.type) {
  case UPDATE_SETTING:
    return Object.assign(
      {},
      state,
      {
        apiendpoint: action.payload.apiendpoint,
        webendpoint: action.payload.webendpoint,
        token: action.payload.token,
        tokenUrl: buildGithubTokenUrl(action.payload.webendpoint)
      }
    );
  case DO_NOTHING:
    return state;
  default:
    return state;
  }
}

function initState () {
  return {
    defaultApiendpoint: defaultSettings.apiendpoint,
    defaultWebendpoint: defaultSettings.webendpoint,
    apiendpoint: defaultSettings.apiendpoint,
    webendpoint: defaultSettings.webendpoint,
    token: defaultSettings.token,
    tokenUrl: buildGithubTokenUrl(defaultSettings.webendpoint)
  };
}
