'use strict';

/**
 * Module dependencies
 */

var argv = require('minimist')(process.argv.slice(2));
var dryrun = argv.c || argv.check;
var fixtures = argv.f || argv.fixtures;
var code = argv.c || argv.code;

// fixtures = fixtures || 'fixtures/{complex,empty,matter,no-{matter,content}}.js';
// code = code || 'code/{gray,front}-matter.js';

// blog
fixtures = fixtures || 'bulk/fixtures/*.js';
code = code || 'bulk/code/*.js';

if (dryrun) {
  require('./support')({
    fixtures: fixtures,
    code: code
  });
} else {

  var Suite = require('benchmarked');
  var suite = new Suite({
    expected: true,
    cwd: __dirname,
    fixtures: fixtures,
    add: code,
  });

  suite.run();
}

