import {
  DO_NOTHING,
  UPDATE_SETTING
} from '../constants/ActionTypes';
import { setSettingData } from '../utils/settingData';
import { encryptData } from '../utils/cryptData';

export function doNothing() {
  return {
    type: DO_NOTHING
  };
}

export function updateSettings(settings) {
  const decorated = decorateSettings(settings);
  return {
    type: UPDATE_SETTING,
    payload: {
      ...decorated
    }
  };
}

export function saveSettings(settings) {
  return (dispatch, getState) => {
    if (getState().setting.interval !== Number(settings.interval)) {
      autopilot(Number(settings.interval));
    }
    dispatch(updateSettings(settings));
    persistSetting(settings);
  };
}

function decorateSettings(settings) {
  return Object.assign(
    {},
    settings,
    {
      token: encryptData(settings.token),
      interval: Number(settings.interval)
    }
  );
}

function persistSetting(diff) {
  setSettingData(decorateSettings(diff));
}

// NOTE: set autopilot on Home#componentDidMount
function autopilot(interval) {
  window.triageForGithub = window.triageForGithub || {};
  window.triageForGithub.autopilotId && window.clearInterval(window.triageForGithub.autopilotId);
  console.log(`update interval ${interval}`);//eslint-disable-line no-console
  if (interval === 0) {
    return;
  }
  window.triageForGithub.autopilotId = window.setInterval(() => {
    console.log(`ping interval with ${interval}`);//eslint-disable-line no-console
  }, interval * 1000);
}
