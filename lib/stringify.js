'use strict';

const getEngine = require('./engine');
const defaults = require('./defaults');
const utils = require('./utils');

module.exports = function(file, data, options) {
  if (arguments.length === 1) {
    switch (utils.typeOf(file)) {
      case 'object':
        data = file.data;
        options = {};
        break;
      case 'string':
        return file;
      default: {
        throw new TypeError('expected file to be a string or object');
      }
    }
  }

  if (arguments.length === 2) {
    options = data;
  }

  if (typeof file === 'string') {
    file = utils.normalize(file);
  }

  let str = file.content;
  let opts = defaults(options);
  if (data == null) {
    if (opts.data) {
      data = opts.data;
    } else {
      return file;
    }
  }

  const language = file.language || opts.language;
  const engine = getEngine(language, opts);
  if (typeof engine.stringify !== 'function') {
    throw new TypeError(`expected "${language}.stringify" to be a function`);
  }

  const open = opts.delimiters[0];
  const close = opts.delimiters[1];

  let buf = '';
  buf += newline(open);
  buf += newline(engine.stringify(data, options));
  buf += newline(close);

  if (typeof file.excerpt === 'string' && file.excerpt !== '') {
    if (str.indexOf(file.excerpt.trim()) === -1) {
      buf += newline(file.excerpt);
      buf += newline(close);
    }
  }

  buf += newline(str);
  return buf;
};

function newline(str) {
  return str.slice(-1) !== '\n' ? str + '\n' : str;
}
