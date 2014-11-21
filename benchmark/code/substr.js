'use strict';

var fs = require('fs');
var extend = require('extend-shallow');
var parsers = require('../../lib/parsers');

module.exports = matter;

function matter(str, options) {
  if (typeof str !== 'string') {
    throw new Error('gray-matter expects a string');
  }

  str = str.replace(/^\uFEFF/, '').replace(/\r/g, '');
  var o = {lang: '', data: {}, content: '', orig: str};
  var opts = extend({lang: 'yaml', eval: true}, options);
  var delims = opts.delims || ['---', '---'];

  var i = str.indexOf(delims[0]);
  if (i !== 0) {
    o.content = str;
    return o;
  }

  var len = delims[0].length;
  str = str.substr(len);

  if (str[0] !== '\n') {
    var n = str.indexOf('\n');
    o.lang = str.substr(0, n);
    str = str.substr(n);
  }

  var ii = str.indexOf(delims[1]);
  o.lang = (o.lang || opts.lang).trim();
  o.data = str.substr(0, ii);

  if (parsers.hasOwnProperty(o.lang)) {
    o.data = parsers[o.lang](o.data, opts);
  }

  if (typeof o.data === 'string') {
    throw new Error('gray-matter cannot parse: ' + o.data);
  }

  o.content = str.substr(ii + delims[1].length).trim();
  return o;
}

matter.read = function(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: filepath
  });
};
