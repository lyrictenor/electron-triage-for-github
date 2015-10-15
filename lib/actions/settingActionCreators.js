import {
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import {initialize as initializeForm } from 'redux-form';
import {
  initApplicationConfig,
  getConfigAll,
  buildSettingFormParams,
  saveSettingsToConfig,
} from '../utils/configs';

// NOTE: set autopilot on Home#componentDidMount
function autopilot(interval) {// eslint-disable-line no-unused-vars
  window.triageForGithub = window.triageForGithub || {};
  if (window.triageForGithub.autopilotId) {
    window.clearInterval(window.triageForGithub.autopilotId);
  }
  console.log(`update interval ${interval}`);// eslint-disable-line no-console
  if (interval === 0) {
    return;
  }
  window.triageForGithub.autopilotId = window.setInterval(() => {
    console.log(`ping interval with ${interval}`);// eslint-disable-line no-console
  }, interval * 1000);
}

export function updateAppGlobal(configs) {
  return {
    type: UPDATE_APP_GLOBAL,
    payload: {
      configs: configs,
    },
  };
}

export function saveSettings(settings) {
  return (dispatch) => {
    getConfigAll()
      .then((pastConfigs) => {// eslint-disable-line no-unused-vars
        return saveSettingsToConfig(settings);
      }).then(() => {
        return getConfigAll();
      }).then((configs) => {
        dispatch(updateAppGlobal(configs));
        dispatch(initializeForm('setting', buildSettingFormParams(configs)));
      }).catch((err) => {
        console.error(err);// eslint-disable-line no-console
      });
  };
}

export function initApplication() {
  return (dispatch) => {
    initApplicationConfig()
      .then(() => {
        return getConfigAll();
      }).then((configs) => {
        dispatch(updateAppGlobal(configs));
        dispatch(initializeForm('setting', buildSettingFormParams(configs)));
      }).catch((err) => {
        console.error(err);// eslint-disable-line no-console
      });
  };
}
