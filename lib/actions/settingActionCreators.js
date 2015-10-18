import {
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import {initialize as initializeForm } from 'redux-form';
import {
  getConfigAll,
  buildSettingFormParams,
  buildConfigMapFromSettings,
  bulkSetConfig,
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
        const nextConfigs = buildConfigMapFromSettings(settings);
        if (pastConfigs.get('enableAutopilot') && !nextConfigs.get('enableAutopilot')) {// true to false
          clearAutopilot();
        } else if (!pastConfigs.get('enableAutopilot') && nextConfigs.get('enableAutopilot') && nextConfigs.get('autopilotInterval') > 0) {// false to true
          clearAutopilot();
          setAutopilot(nextConfigs('autopilotInterval'), dispatch);
        } else if (pastConfigs.get('enableAutopilot') && nextConfigs.get('enableAutopilot') && pastConfigs.get('autopilotInterval') !== nextConfigs.get('autopilotInterval') && nextConfigs.get('autopilotInterval') > 0) {// true to true and modified interval
          clearAutopilot();
          setAutopilot(nextConfigs.get('autopilotInterval'), dispatch);
        }
        return bulkSetConfig(nextConfigs);
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
