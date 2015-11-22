'use strict';
const path = require('path');
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const mbIndex = `file://${path.join(__dirname, 'index.html')}#/home`;

let mainWindow;
const electronDebug = require('electron-debug');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
electronDebug();

function createMainWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 400
  });

  win.loadUrl(mbIndex);
  win.on('closed', onClosed);

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  if (process.platform === 'darwin') {
    require('electron-template-menu')();
  }
  mainWindow = createMainWindow();
});
