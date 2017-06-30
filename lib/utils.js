'use strict';

const stripBom = require('strip-bom-string');
const utils = module.exports = exports;
utils.typeOf = require('kind-of');

/**
 * Cast `val` to an array.
 */

utils.isBuffer = function(val) {
  return utils.typeOf(val) === 'buffer';
};

/**
 * Cast `val` to an array.
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Cast `val` to an array.
 */

utils.toBuffer = function(input) {
  if (typeof input === 'string') {
    return new Buffer(input);
  }
  return input;
};

/**
 * Cast `val` to an array.
 */

utils.toString = function(input) {
  if (utils.isBuffer(input)) {
    return stripBom(String(input));
  }
  if (typeof input !== 'string') {
    throw new TypeError('expected input to be a string or buffer');
  }
  return stripBom(input);
};

/**
 * Cast `val` to an array.
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Return true if the givne string starts with the specified substring
 */

utils.startsWith = function(str, substr, len) {
  if (typeof len !== 'number') len = substr.length;
  return str.slice(0, len) === substr;
};
