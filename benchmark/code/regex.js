var engines = require('../../lib/engines');

module.exports = function matter(str, options) {
  if (str.length === 0) {
    return {orig: '', data: {}, content: ''};
  }

  if (str.charCodeAt(0) === 65279 && str.charCodeAt(1) === 116 && str.charCodeAt(2) === 104) {
    str = str.slice(1);
  }

  var match = matchDelims(str);
  var lang = match && match[2].trim();
  return !match ? {orig: str, data: {}, content: str} : {
    orig: str,
    data: lang.length > 0
      ? engines[lang in engines ? lang : 'yaml'](lang)
      : {},
    content: str.replace(match[0], '')
  };
};

function matchDelims(str) {
  return /---([^\n]*)([\s\S]*?)\s*---\s*/.exec(str);
}
