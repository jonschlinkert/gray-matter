'use strict';

const typeOf = require('kind-of');
const getEngine = require('./engine');
const defaults = require('./defaults');

module.exports = function(file, data, options) {
  if (data == null && options == null) {
    switch (typeOf(file)) {
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

  data = Object.assign({}, file.data, data);
  const open = opts.delimiters[0];
  const close = opts.delimiters[1];
  const matter = newline(engine.stringify(data, options));
  let buf = '';

  if (matter.trim() !== '{}') {
    buf += newline(open);
    buf += matter;
    buf += newline(close);
  }

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
