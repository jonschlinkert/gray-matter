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

  str = str.substr(delims[0].length);
  var sections = str.split(delims[0]);
  o.data = sections[0];

  if (o.data[0] !== '\n') {
    var n = o.data.indexOf('\n');
    o.lang = o.data.substr(0, n).trim();
    o.data = o.data.substr(n);
  }

  if (parsers.hasOwnProperty(o.lang)) {
    o.data = parsers[o.lang](o.data, opts);
  }

  if (typeof o.data === 'string') {
    throw new Error('gray-matter cannot parse: ' + o.data);
  }

  sections.shift();
  o.content = sections.join(delims[0]).trim();
  return o;
}

matter.read = function(filepath, options) {
  var str = fs.readFileSync(filepath, 'utf8');
  var obj = matter(str, options);
  return extend(obj, {
    path: filepath
  });
};
