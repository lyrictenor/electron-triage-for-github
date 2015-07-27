'use strict';
// menubar-debug based on electron-debug
//
// electron-debug
// MIT © Sindre Sorhus
// https://github.com/sindresorhus/electron-debug
const app = require('app');
const globalShortcut = require('global-shortcut');
const BrowserWindow = require('browser-window');
const isOSX = process.platform === 'darwin';

module.exports = function (application) {
  application = application || app;
  application.on('ready', function () {
    globalShortcut.register(isOSX ? 'Cmd+Alt+I' : 'Ctrl+Shift+I', function () {
      var win = BrowserWindow.getFocusedWindow();

      if (win) {
        win.toggleDevTools();
      }
    });

    globalShortcut.register('CmdOrCtrl+R', function () {
      var win = BrowserWindow.getFocusedWindow();

      if (win) {
        win.reloadIgnoringCache();
      }
    });
  });
};
