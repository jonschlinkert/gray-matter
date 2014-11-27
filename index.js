'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('./lib/parsers');

module.exports = matter;

function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }

  str = str.replace(/^\uFEFF/, '').replace(/\r/g, '');
  var o = {lang: '', data: {}, content: '', orig: str};
  var opts = extend({lang: 'yaml'}, options);
  var delims = opts.delims || ['---', '---'];

  var i = str.indexOf(delims[0]);
  if (i !== 0) {
    o.lang = '';
    o.content = str;
    return o;
  }

  var len1 = delims[0].length;
  var len2 = delims[1].length;
  var ch = len1;
  var lang;

  while ((lang = str.charAt(ch++)) !== '\n') {
    o.lang += lang;
  }
  var ll = o.lang.length;
  var to = str.indexOf(delims[1], len1);
  o.lang = (o.lang || opts.lang).trim();
  var fn = parsers[o.lang];
  if (fn) {
    o.data = fn(str.substr(len1 + ll, to - ll - len2), opts);
  } else {
    o.data = str.substr(len1 + ll, to - ll - len2);
  }

  if (typeof o.data === 'string') {
    throw new Error('gray-matter cannot parse: ' + str);
  }

  return {
    orig: o.orig,
    data: o.data,
    content: str.substr(to + len2).trim()
  };
}

matter.read = function(fp, options) {
  var str = fs.readFileSync(fp, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: fp
  });
};

matter.stringify = function(str, data, options) {
  var yaml = require('js-yaml');
  var res = '';
  res += '---\n';
  res += yaml.safeDump(data, options);
  res += '---\n';
  res += str;
  res += '\n';
  return res;
};
