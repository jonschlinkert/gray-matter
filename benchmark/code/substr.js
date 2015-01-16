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

  var res = defaults;
  var opts = extend({lang: 'yaml'}, options);
  var delims = opts.delims || ['---', '---'];

  var len = delims[0].length;
  str = str.substr(len);

  if (str[0] !== '\n') {
    var n = str.indexOf('\n');
    res.lang = str.substr(0, n);
    str = str.substr(n);
  }

  var ii = str.indexOf(delims[1]);
  res.lang = (res.lang || opts.lang).trim();
  res.data = str.substr(0, ii);

  if (res.data.length > 0 && parsers.hasOwnProperty(res.lang)) {
    res.data = parsers[res.lang](res.data, opts);
  }

  if (typeof res.data === 'string') {
    throw new Error('gray-matter cannot parse: ' + res.data);
  }

  res.content = str.substr(ii + delims[1].length).trim();
  return res;
}

matter.read = function(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: filepath
  });
};
