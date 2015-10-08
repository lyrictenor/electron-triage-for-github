import defaultSettings from '../data/default_settings.json';
import {
  DO_NOTHING,
  UPDATE_SETTING,
} from '../constants/ActionTypes';
import buildGithubTokenUrl from '../utils/buildGithubTokenUrl';
// import { getSettingData } from '../utils/settingData';
import { getSettingData } from '../utils/settingLevel';
import isEmptyObject from 'is-empty-object';

function decorateSettings(settings) {
  return Object.assign(
    {},
    settings,
    {
      defaultApiendpoint: defaultSettings.apiendpoint,
      defaultWebendpoint: defaultSettings.webendpoint,
      tokenUrl: buildGithubTokenUrl(settings.webendpoint),
      defaultInterval: defaultSettings.interval,
    }
  );
}

async function initState() {
  const savedData = await getSettingData();
  return (isEmptyObject(savedData)) ? decorateSettings(defaultSettings) : decorateSettings(savedData);
}

export default function(state = initState(), action = {}) {
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
