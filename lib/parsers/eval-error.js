'use strict';

var red = require('ansi-red');

module.exports = function evalError(lang, color) {
  var msg = '[gray-matter]: to parse ' + lang + ' set `options.eval` to `true`';
  return color ? red(msg) : msg;
}
