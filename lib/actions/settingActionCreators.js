import {
  DO_NOTHING,
  UPDATE_SETTING,
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import {
  getSettingDataPromise,
  setSettingDataPromise,
  filterOutputSettings,
} from '../utils/settingData';
import {
  encryptData,
  decryptData,
} from '../utils/cryptData';
import defaultSettings from '../data/default_settings.json';
import isEmptyObject from 'is-empty-object';
import {initialize as initializeForm } from 'redux-form';
import {
  initApplicationConfig,
  getConfigAll,
  buildSettingFormParams,
} from '../utils/configs';

function decorateSettings(settings) {
  return Object.assign(
    {},
    settings,
    {
      token: encryptData(settings.token),
      interval: Number(settings.interval),
    }
  );
}

// NOTE: set autopilot on Home#componentDidMount
function autopilot(interval) {
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

function persistSetting(diff) {
  setSettingDataPromise(decorateSettings(diff))
    .catch((err) => {
      console.error(err);// eslint-disable-line no-console
    });
}

export function doNothing() {
  return {
    type: DO_NOTHING,
  };
}

export function updateSettings(settings) {
  const decorated = decorateSettings(settings);
  return {
    type: UPDATE_SETTING,
    payload: {
      ...decorated,
    },
  };
}

export function saveSettings(settings) {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        const pastSettings = filterOutputSettings(value);
        if (pastSettings.interval !== Number(settings.interval)) {
          autopilot(Number(settings.interval));
        }
        dispatch(updateSettings(settings));
        persistSetting(settings);
      });
  };
}

export function initSettings() {
  return (dispatch) => {
    getSettingDataPromise()
      .then((value) => {
        let settings;
        if (isEmptyObject(value)) {
          settings = defaultSettings;
        } else {
          settings = Object.assign({}, value, {token: decryptData(value.token)});
        }
        autopilot(Number(settings.interval));
        dispatch(updateSettings(settings));
        dispatch(initializeForm('setting', settings));
        if (isEmptyObject(value)) {
          persistSetting(settings);
        }
      });
  };
}

export function updateAppGlobal(configs) {
  return {
    type: UPDATE_APP_GLOBAL,
    payload: {
      configs: configs,
    },
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
      });
  };
}
