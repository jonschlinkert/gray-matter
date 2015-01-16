'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

module.exports = matter;

function matter(str, options) {
  var defaults = {orig: str, data: {}, content: str};
  if (str == '') {
    return defaults;
  }

  // strip BOM
  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  if (str.slice(0, 3) !== '---') {
    return defaults;
  }

  var res = {lang: 'yaml', data: {}, content: '', orig: str};
  var opts = extend({}, options);
  var delims = opts.delims || ['---', '---'];

  str = str.substr(delims[0].length);
  var sections = str.split(delims[0]);
  res.data = sections[0];

  if (res.data[0] !== '\n') {
    var n = res.data.indexOf('\n');
    res.lang = res.data.substr(0, n).trim();
    res.data = res.data.substr(n);
  }

  if (res.data.length > 0) {
    res.data = parsers[res.lang](res.data, opts);
  }

  // if (typeof res.data === 'string') {
  //   throw new Error('gray-matter cannot parse: ' + res.data);
  // }

  sections.shift();
  res.content = sections.join(delims[0]).trim();
  return res;
}

matter.read = function(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: filepath
  });
};
