var extend = require('extend-shallow');
var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  if (str === '') {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  if (str.slice(0, 3) !== '---') {
    return {orig: str, data: {}, content: str};
  }

  var res = {orig: str, data: '', content: ''};
  var opts = extend({lang: 'yaml', eval: true}, options);

  // delimiters to use. defaults are `---`
  var delim = '---';
  var lang = '';
  var lines = str.split('\n');
  var len = lines.length;
  var dlen = delim.length;
  var hasLang = false;

  var limit = 0;
  var num = 0;
  var i = 0;
  var start = 0;
  var count = 0;
  var end = 0;

  while (len--) {
    var line = lines[i++];
    if (line.slice(0, dlen) === delim) {
      if (hasLang === false) {
        lang = line.slice(dlen).trim();
        hasLang = true;
      }
      start = i + 1;
      count++;
    }

    if (i >= start && count === 1) {
      res.data += line + '\n';
    }

    if (end !== 0 && i > end) {
      res.content += line + '\n';
    }

    if (count === 2) {
      end = i;
    }
  }

  // The actual data block to parse
  var data = res.data.trim();
  if (data.length > 0) {
    var fn = engines[lang || opts.lang];
    if (typeof fn === 'function') {
      res.data = fn(data, opts);
    } else {
      res.data = {};
    }
  } else {
    res.data = {};
  }

  return res;
};
