import defaultSettings from '../data/default_settings.json';
import {
  DO_NOTHING,
  UPDATE_SETTING
} from '../constants/ActionTypes';
import buildGithubTokenUrl from '../utils/buildGithubTokenUrl';
import { getSettingData } from '../utils/settingData';
import isEmptyObject from 'is-empty-object';
import { encryptData } from '../utils/cryptData';

function decorateSettings (settings) {
  return Object.assign(
    {},
    settings,
    {
      defaultApiendpoint: defaultSettings.apiendpoint,
      defaultWebendpoint: defaultSettings.webendpoint,
      token: encryptData(settings.token),
      tokenUrl: buildGithubTokenUrl(settings.webendpoint)
    }
  );
}

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
        token: encryptData(action.payload.token),
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
  const savedData = getSettingData();
  return (isEmptyObject(savedData)) ? decorateSettings(defaultSettings) : decorateSettings(savedData);
}
