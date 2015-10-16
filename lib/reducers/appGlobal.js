import {
  UPDATE_APP_GLOBAL,
} from '../constants/ActionTypes';
import defaultSettings from '../data/default_settings.json';
import {
  isString,
  isFinite,
  isDate,
  isBoolean,
} from 'lodash';

function token(state = defaultSettings.token, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (isString(action.payload.configs.get('token'))) {
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
      if (isString(action.payload.configs.get('apiEndpoint'))) {
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
      if (isString(action.payload.configs.get('webEndpoint'))) {
        return action.payload.configs.get('webEndpoint');
      }
    }
    return state;
  default:
    return state;
  }
}

function autopilotInterval(state = defaultSettings.autopilotInterval, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (isFinite(action.payload.configs.get('autopilotInterval'))) {
        return action.payload.configs.get('autopilotInterval');
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
      if (isBoolean(action.payload.configs.get('autopoloting'))) {
        return action.payload.configs.get('autopoloting');
      }
    }
    return state;
  default:
    return state;
  }
}

function enableAutopilot(state = defaultSettings.enableAutopilot, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (isBoolean(action.payload.configs.get('enableAutopilot'))) {
        return action.payload.configs.get('enableAutopilot');
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
      if (isDate(action.payload.configs.get('autopilotedAt'))) {
        return action.payload.configs.get('autopilotedAt');
      }
    }
    return state;
  default:
    return state;
  }
}

function storyUpdatedAt(state = null, action = {}) {
  switch (action.type) {
  case UPDATE_APP_GLOBAL:
    if (action.payload.configs) {
      if (isDate(action.payload.configs.get('storyUpdatedAt'))) {
        return action.payload.configs.get('storyUpdatedAt');
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
    ['defaultAutopilotInterval', defaultSettings.autopilotInterval],
    ['token', token(state.get('token'), action)],
    ['apiEndpoint', apiEndpoint(state.get('apiEndpoint'), action)],
    ['webEndpoint', webEndpoint(state.get('webEndpoint'), action)],
    ['autopilotInterval', autopilotInterval(state.get('autopilotInterval'), action)],
    ['autopiloting', autopiloting(state.get('autopiloting'), action)],
    ['autopilotedAt', autopilotedAt(state.get('autopilotedAt'), action)],
    ['enableAutopilot', enableAutopilot(state.get('enableAutopilot'), action)],
    ['storyUpdatedAt', storyUpdatedAt(state.get('storyUpdatedAt'), action)],
  ]);
}
