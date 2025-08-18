const defaults = require('./defaults');
const utils = require('./utils');

module.exports = function(str, options) {
  const opts = defaults(options);
  const dlen = str.search(/\r?\n/);
  let raw, name, delimiters;
  if (dlen > 0) {
    const customDelims = mapCustomDelimiters(opts);
    raw = str.substr(0, dlen);
    const firstLine = raw.trim();
    if (customDelims[firstLine]) {
      name = customDelims[firstLine];
      delimiters = utils.arrayify(opts.engines[name].delimiters);
      if (delimiters.length === 1) {
        delimiters.push(delimiters[0]);
      }
      return {
        raw: raw || '',
        name: name || '',
        delimiters
      };
    }
  }

  // No frontmatter
  return {
    raw: '',
    name: '',
    delimiters: null
  };
};

function mapCustomDelimiters(opts) {
  const customDelims = {};
  for (const engine in opts.engines) {
    if (opts.engines[engine].delimiters) {
      const delims = utils.arrayify(opts.engines[engine].delimiters);
      if (customDelims[delims[0]]) {
        throw new Error('Another engine has already used delimiter: ' + delims[0]);
      }
      if (delims[0] === opts.delimiters[0]) {
        throw new Error('Engine specific delimiters cannot match the default delimiters: ' + opts.delimiters[0]);
      }
      customDelims[delims[0]] = engine;
    }
  }
  return customDelims;
}
