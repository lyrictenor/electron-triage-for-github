'use strict';
var assert = require('power-assert');
var triageForGithub = require('./');

it('should ', function () {
  assert.strictEqual(triageForGithub('unicorns'), 'unicorns & rainbows');
});
it('should not ', function () {
  assert.strictEqual(triageForGithub('unicorns'), 'unicorns & wrong');
});
