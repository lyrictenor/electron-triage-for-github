import { DO_NOTHING, UPDATE_SETTING } from '../constants/ActionTypes';

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
