import {
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import defaultSettings from '../data/default_settings.json';
import _ from 'lodash';// eslint-disable-line id-length

function token(state = defaultSettings.token, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isString(action.payload.configs.get('token'))) {
        return action.payload.configs.get('token');
      }
    }
    return state;
  default:
    return state;
  }
}

function apiEndpoint(state = defaultSettings.apiEndpoint, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isString(action.payload.configs.get('apiEndpoint'))) {
        return action.payload.configs.get('apiEndpoint');
      }
    }
    return state;
  default:
    return state;
  }
}

function webEndpoint(state = defaultSettings.webEndpoint, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isString(action.payload.configs.get('webEndpoint'))) {
        return action.payload.configs.get('webEndpoint');
      }
    }
    return state;
  default:
    return state;
  }
}

function interval(state = defaultSettings.interval, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isFinite(action.payload.configs.get('interval'))) {
        return action.payload.configs.get('interval');
      }
    }
    return state;
  default:
    return state;
  }
}

function autopiloting(state = false, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isBoolean(action.payload.configs.get('autopoloting'))) {
        return action.payload.configs.get('autopoloting');
      }
    }
    return state;
  default:
    return state;
  }
}

function autopilotedAt(state = null, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (_.isDate(action.payload.configs.get('autopolotedAt'))) {
        return action.payload.configs.get('autopolotedAt');
      }
    }
    return state;
  default:
    return state;
  }
}

export default function(state = new Map(), action = {}) {
  return new Map([
    ['defaultApiEndpoint', defaultSettings.apiEndpoint],
    ['defaultWebEndpoint', defaultSettings.webEndpoint],
    ['defaultInterval', defaultSettings.interval],
    ['token', token(state.get('token'), action)],
    ['apiEndpoint', apiEndpoint(state.get('apiEndpoint'), action)],
    ['webEndpoint', webEndpoint(state.get('webEndpoint'), action)],
    ['interval', interval(state.get('interval'), action)],
    ['autopiloting', autopiloting(state.get('autopiloting'), action)],
    ['autopilotedAt', autopilotedAt(state.get('autopilotedAt'), action)],
  ]);
}
