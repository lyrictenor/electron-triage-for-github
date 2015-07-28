import defaultSettings from '../data/default_settings.json';
import { DO_NOTHING } from '../constants/ActionTypes';

export default function (state = undefined, action = {}) {
  if (typeof state === 'undefined') {
    state = initState();
  }
  switch (action.type) {
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
    defaultToken: defaultSettings.token,
    apiendpoint: defaultSettings.apiendpoint,
    webendpoint: defaultSettings.webendpoint,
    token: defaultSettings.token
  };
}
