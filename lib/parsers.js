/**
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var YAML = require('js-yaml');
var log = require('verbalize');

var parse = module.exports = {};

function generateMessage (parser, e) {
  log.error('  [gray-matter]', log.bold(e));
  // log.error('  [gray-matter]', log.yellow(parser) + ' detected but not found in node_modules.');
  // log.error('  [gray-matter]', 'Please run `npm i ' + parser + '` to install.');
}

parse.yaml = function(src) {
  return YAML.load(src);
};

parse.json = function(src) {
  return JSON.parse(src);
};

parse.coffee = function(src, options) {
  options = options || {};
  try {
    var coffee = require('coffee-script');
    return coffee['eval'](src, options);
  } catch (e) {
    generateMessage('coffee-script', e);
  }
};

parse.cson = function(src, options) {
  options = options || {};
  try {
    var cson = require('cson');
    return cson.parseSync(src, options);
  } catch (e) {
    generateMessage('cson', e);
  }
};

parse.toml = function(src) {
  try {
    var toml = require('toml');
    return toml.parse(src.trim());
  } catch (e) {
    generateMessage('toml', e);
  }
};
