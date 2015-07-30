'use strict';
const path = require('path');
const menubar = require('menubar');
const mbIndex = `file://${path.join(__dirname, 'index.html')}#/home`;
const mb = menubar({ index: mbIndex, height: 175, x: 0, y: 0 });
const Menu = require('menu');
const ipc = require('ipc');
const electronDebug = require('electron-debug');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
electronDebug();

// when receive the abort message, close the app
ipc.on('abort', function () {
  mb.emit('hide');
  mb.window.hide();
  mb.emit('after-hide');
});

var template = [
  {
    label: 'TriageForGitHub',
    submenu: [
      {
        label: 'Quit App',
        accelerator: 'CmdOrCtrl+Q',
        selector: 'terminate:'
      }
    ]
  }
];

mb.on('ready', function ready () {
  // Build default menu
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  mb.tray.emit('clicked', null, {x: 0, y: 0, width: 0, height: 0});
});
