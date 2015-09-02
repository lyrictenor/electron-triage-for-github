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
