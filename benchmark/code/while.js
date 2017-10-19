var extend = require('extend-shallow');
var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  if (str.length === 0) {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  var o = {data: {}, content: '', orig: str};
  var opts = extend({lang: 'yaml', eval: true}, options);
  var delim = opts.delims || ['---', '---'];

  // make sure the starting delim is first thing
  if (str.slice(0, delim[0].length) !== delim[0]) {
    return {orig: str, data: {}, content: str};
  }

  var len = delim[0].length;
  var ch = len;
  var language, lang = '';

  while ((language = str.charAt(ch++)) !== '\n') {
    lang += language;
  }

  var ll = lang.length;
  var to = str.indexOf(delim[0], len);
  lang = (lang || opts.lang).trim();

  var fn = engines[lang];
  var data = str.substr(len + ll, to - ll - len);
  if (fn && data.length > 0) {
    o.data = fn(data, opts);
  } else {
    o.data = str.substr(len + ll, to - ll - len);
  }

  if (typeof o.data !== 'object') {
    throw new Error('gray-matter cannot parse: ' + o.data);
  }

  o.content = str.substr(to + len).trim();
  return o;
};
