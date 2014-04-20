/**
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */


'use strict';

var YAML = require('js-yaml');

var parse = module.exports = {};

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
    console.warn('Please run `npm i coffee-script`:' + src, e);
  }
};

parse.toml = function(src) {
  try {
    var toml = require('toml');
    return toml.parse(src.trim());
  } catch (e) {
    console.warn('Please run `npm i toml`:' + src, e);
  }
};
