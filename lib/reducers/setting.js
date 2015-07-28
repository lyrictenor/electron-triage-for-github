import defaultSettings from '../data/default_settings.json';

export default function (state = undefined, action = {}) {
  if (typeof state === 'undefined') {
    state = initState();
  }
  switch (action.type) {
    default:
      return state;
  }
}

function initState () {
  return {
    defaultApiendpoint: defaultSettings.apiendpoint,
    defaultWebendpoint: defaultSettings.webendpoint,
    defaultToken: defaultSettings.token,
    apiendpoint: defaultSettings.apiendpoint,
    webendpoint: defaultSettings.webendpoint,
    token: defaultSettings.token
  };
}
