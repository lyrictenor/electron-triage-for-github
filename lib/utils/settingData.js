import defaultSettings from '../data/default_settings.json';
import buildGithubTokenUrl from './buildGithubTokenUrl';

export function filterOutputSettings(settings) {
  return Object.assign(
    {},
    settings,
    {
      defaultApiendpoint: defaultSettings.apiendpoint,
      defaultWebendpoint: defaultSettings.webendpoint,
      tokenUrl: buildGithubTokenUrl(settings.webendpoint),
      defaultInterval: defaultSettings.interval,
    }
  );
}

export function getSettingDataPromise() {
  return new Promise((resolve) => {
    const saved = window.localStorage.getItem('setting-data');
    if (!saved) {
      resolve({});
      return;
    }
    resolve(JSON.parse(saved));
  });
}

export function setSettingDataPromise(settingData) {
  return new Promise((resolve) => {
    window.localStorage.setItem('setting-data', JSON.stringify(settingData));
    resolve();
  });
}
