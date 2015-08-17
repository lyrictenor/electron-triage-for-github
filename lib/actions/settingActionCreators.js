import {
  DO_NOTHING,
  UPDATE_SETTING
} from '../constants/ActionTypes';
import { setSettingData } from '../utils/settingData';

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
  return (dispatch) => {
    dispatch(updateSettings(settings));
    persistSetting(settings);
  };
}

function persistSetting(diff) {
  setSettingData(Object.assign({}, diff));
}
