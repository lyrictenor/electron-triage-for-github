import {
  DO_NOTHING,
  UPDATE_SETTING
} from '../constants/ActionTypes';

export function doNothing() {
  return {
    type: DO_NOTHING
  };
}

export function updateSettings(settings) {
  return {
    type: UPDATE_SETTING,
    payload: {
      ...settings
    }
  };
}

export function saveSettings(settings) {
  return () => {
    triage_for_github.getDbConnection().then(() => {
      return triage_for_github.saveSettings(settings);
    });
  };
}
