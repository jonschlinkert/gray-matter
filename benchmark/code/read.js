var extend = require('extend-shallow');
var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  var defaults = {orig: str, data: {}, content: str};
  if (str == '') {
    return defaults;
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  // default results
  var opts = extend({eval: true}, options);

  // delimiters to use. defaults are `---`
  var delim1 = '---';
  var delim2 = '---';

  // delimiter lengths
  var alen = delim1.length;
  var blen = delim2.length;

  if (str.slice(0, 3) !== '---') {
    return defaults;
  }

  // index of the first newline
  var nl = str.indexOf('\n');

  // parser language to use
  var lang = str.slice(alen, nl);
  var res = defaults;

  // start/end index of the data block to parse
  var dataStart = (alen + lang.length);
  var dataEnd = str.indexOf(delim2, dataStart);

  // The actual data block to parse
  var data = str.slice(dataStart, dataEnd).trim();

  var fn = opts.parser || parser(lang.trim(), opts);
  if (data.length > 0 && typeof fn === 'function') {
    try {
      res.data = fn(data, opts);
    } catch (err) {}
  } else if (opts.strict) {
    throw new Error('gray-matter cannot find a parser for: ' + str);
  } else {
    res.data = {};
  }

  res.content = str.slice(blen + dataEnd);
  delete res.lang;
  return res;
};

/**
 * Determine the correct the parser to use
 *
 * @param  {String} `lang` Use this if defined and it exists
 * @param  {Object} `opts` Otherwise, fall back to options.parser or js-yaml
 * @return {Function}
 */

function parser(lang, opts) {
  lang = lang || opts.lang;
  if (engines.hasOwnProperty(lang)) {
    return engines[lang];
  }
  return engines.yaml;
}
