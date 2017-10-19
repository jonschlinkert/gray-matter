var extend = require('extend-shallow');
var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  if (str.length === 0) {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  // default results
  var opts = extend({lang: 'yaml', eval: true}, options);
  var res = {orig: str, data: '', content: ''};
  var delim = opts.delims || ['---', '---'];

  // make sure the starting delim is first thing
  if (str.slice(0, delim[0].length) !== delim[0]) {
    res.content = str;
    res.data = {};
    delete res.lang;
    return res;
  }

  var len = delim[0].length;

  // index of the first newline
  var nl = str.indexOf('\n');

  // parser language to use
  var lang = str.slice(len, nl).trim() || opts.lang;

  // start/end index of the data block to parse
  var dataStart = nl + 1;
  var dataEnd = str.indexOf(delim[0], dataStart);

  // The actual data block to parse
  var data = str.slice(dataStart, dataEnd).trim();
  if (data.length > 0) {
    res.data = engines[lang](data, opts);
  }

  res.content = str.slice(len + dataEnd).trim();
  delete res.lang;
  return res;
};
