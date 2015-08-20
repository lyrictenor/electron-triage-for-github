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
  return (dispatch) => {
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
