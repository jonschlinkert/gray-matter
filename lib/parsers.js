/**
 * Gray Matter
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// node_modules
var YAML = require('js-yaml'),
  coffee,
  toml;

// The module to export
var parse = module.exports = {};


parse.yaml = function(src) {
  return YAML.load(src);
};

parse.json = function(src) {
  return JSON.parse(src);
};

parse.coffee = function(src, options) {
  options = options || {};
  if (!coffee) {
    coffee = require('coffee-script');
  }
  try {
    return coffee['eval'](src, options);
  } catch (e) {
    console.warn('Could not parse coffee-script:', e);
  }
};

parse.toml = function(src) {
  if (!toml) {
    toml = require('toml');
  }
  try {
    return toml.parse(src.trim());
  } catch (e) {
    console.warn('Count not parse toml:' + src, e);
  }
};
