'use strict';
var assert = require('power-assert');
var npmModules = require('./');

it('should ', function () {
  assert.strictEqual(npmModules('unicorns'), 'unicorns & rainbows');
});
it('should not ', function () {
  assert.strictEqual(npmModules('unicorns'), 'unicorns & wrong');
});
