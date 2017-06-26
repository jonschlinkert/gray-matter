'use strict';

const yaml = require('js-yaml');
const utils = require('./utils');

module.exports = function(options) {
  const opts = options || {};
  const engines = {
    json: {
      parse: function(str, options) {
        return JSON.parse.apply(JSON, arguments);
      },
      stringify: function(obj, options) {
        const opts = Object.assign({replacer: null, space: 2}, options);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    },
    javascript: {
      parse: function parse(str, options, wrap) {
        /* eslint no-eval: 0 */
        try {
          if (wrap !== false) {
            str = '(function() {return {' + str + '}; }());';
          }
          return eval(str);
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      }
    },
    yaml: {
      parse: function(str, options) {
        return yaml.safeLoad(str, options);
      },
      stringify: function(data, options) {
        return yaml.safeDump(data, options);
      }
    }
  };

  // ensure that delimiters are an array
  opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || '---');
  if (opts.delimiters.length === 1) {
    opts.delimiters.push(opts.delimiters[0]);
  }

  opts.language = (opts.language || opts.lang || 'yaml').toLowerCase();
  opts.engines = Object.assign({}, engines, opts.engines);
  return opts;
};
