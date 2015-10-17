import {
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import {initialize as initializeForm } from 'redux-form';
import {
  getConfigAll,
  buildSettingFormParams,
  saveSettingsToConfig,
} from '../utils/configs';
import {
  fetchStories,
} from './storyActionCreators';

export function clearAutopilot() {
  window.triageForGithub = window.triageForGithub || {};
  if (window.triageForGithub.autopilotId) {
    window.clearInterval(window.triageForGithub.autopilotId);
  }
}

export function setAutopilot(intervalSecond, dispatch) {
  window.triageForGithub = window.triageForGithub || {};
  window.triageForGithub.autopilotId = window.setInterval(() => {
    dispatch(fetchStories());
  }, intervalSecond * 1000);
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
      .then((pastConfigs) => {
        if (pastConfigs.get('enableAutopilot') && !settings.enableAutopilot) {// true to false
          clearAutopilot();
        } else if (!pastConfigs.get('enableAutopilot') && settings.enableAutopilot && Number(settings.autopilotInterval) > 0) {// false to true
          clearAutopilot();
          setAutopilot(Number(settings.autopilotInterval), dispatch);
        } else if (pastConfigs.get('enableAutopilot') && settings.enableAutopilot && pastConfigs.get('autopilotInterval') !== Number(settings.autopilotInterval) && Number(settings.autopilotInterval) > 0) {// true to true and modified interval
          clearAutopilot();
          setAutopilot(Number(settings.autopilotInterval), dispatch);
        }

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

export function initSettings() {
  return (dispatch) => {
    getConfigAll()
      .then((configs) => {
        dispatch(updateAppGlobal(configs));
        dispatch(initializeForm('setting', buildSettingFormParams(configs)));
        if (configs.get('enableAutopilot') && configs.get('autopilotInterval') > 0) {
          clearAutopilot();
          setAutopilot(configs.get('autopilotInterval'), dispatch);
        }
      }).catch((err) => {
        console.error(err);// eslint-disable-line no-console
      });
  };
}
