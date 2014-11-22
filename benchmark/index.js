'use strict';

/**
 * Module dependencies
 */

var Suite = require('benchmarked');

var suite = new Suite({
  expected: true,
  fixtures: 'fixtures/*.js',
  add: 'code/*.js',
  cwd: __dirname
});

suite.run();
