#!/usr/bin/env node
/*eslint no-console:0*/
'use strict';
var meow = require('meow');
var npmModules = require('./');

var cli = meow({
  help: [
    'Usage',
    '  $ npm-modules [input]',
    '',
    'Examples',
    '  $ npm-modules',
    '  unicorns & rainbows',
    '',
    '  $ npm-modules ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false'
  ]
});

console.log(npmModules(cli.input[0] || 'unicorns'));
