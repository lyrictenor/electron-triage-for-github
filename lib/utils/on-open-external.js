import isElectronRenderer from 'is-electron-renderer';
export default (url, event) => {
  if(isElectronRenderer) {
    const shell = require('shell');
    if (url && url.preventDefault) {
      event = url;
      event.preventDefault();
      shell.openExternal(event.target.href);
    } else {
      event.preventDefault();
      shell.openExternal(url);
    }
  } else {
    if (url && !url.preventDefault) {
      event.preventDefault();
      window.location.href = url;
    }
  }
};
