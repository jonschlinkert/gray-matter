'use strict';

var extend = require('extend-shallow');
var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  var res = {orig: str, data: {}, content: ''};
  if (str == '') {
    return res;
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  if (str.slice(0, 3) !== '---') {
    return res;
  }

  var opts = extend({lang: 'yaml', eval: true}, options);
  var delim = '---';
  var dlen = delim.length;
  var len = str.length - dlen;
  var i = dlen;

  var langEnd = false, dataEnd = false;
  var data = '', lang = '', next = dlen;

  while (len--) {
    var ch = str.charCodeAt(i);
    if (langEnd === false && ch == 10 /* '\n' */) {
      langEnd = true;
      next = i;
    }

    if (ch === 45 && str.charCodeAt(i + 1) === 45 && str.charCodeAt(i + 2) === 45) {
      dataEnd = true;
      next = i + 2;
    }

    if (langEnd === false) {
      lang += str.charAt(i);
    }

    if (langEnd === true && dataEnd === false) {
      data += str.charAt(i);
    }

    if (dataEnd === true && i > next) {
      res.content += str.charAt(i);
    }
    i++;
  }

  lang = (lang && lang.length > 0)
    ? lang.trim()
    : (opts.lang || 'yaml');

  data = (data && data.length > 0)
    ? data.trim()
    : null;

  if (data && data.length > 0) {
    var fn = engines[lang];
    if (typeof fn === 'function') {
      // The actual data block to parse
      res.data = fn(data, opts);
    }
  }

  if (data == null) {
    res.data = {};
  }

  return res;
};
