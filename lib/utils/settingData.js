export function getSettingData() {
  const saved = window.localStorage.getItem('setting-data');
  if (saved) {
    return JSON.parse(saved);
  }
  return {};
}

export function setSettingData(settingData) {
  window.localStorage.setItem('setting-data', JSON.stringify(settingData));
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
