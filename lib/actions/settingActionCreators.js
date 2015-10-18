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
import CompareConfigs from '../utils/compare-configs';

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
      .then((prevConfigs) => {
        const nextConfigs = buildConfigMapFromSettings(settings);
        const compare = new CompareConfigs({prev: prevConfigs, next: nextConfigs});
        if (compare.trueToFalse()) {
          clearAutopilot();
        } else if (compare.falseToTrue() || compare.trueToTrueAndModifiedInterval()) {
          clearAutopilot();
          setAutopilot(nextConfigs('autopilotInterval'), dispatch);
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
