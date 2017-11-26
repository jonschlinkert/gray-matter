'use strict';

var extend = require('extend-shallow');
var yaml = require('js-yaml');
var HJSON = require('hjson');

/**
 * Default engines
 */

var engines = exports = module.exports;

/**
 * YAML
 */

engines.yaml = {
  parse: yaml.safeLoad.bind(yaml),
  stringify: yaml.safeDump.bind(yaml)
};

/**
 * JSON
 */

engines.json = {
  parse: JSON.parse.bind(JSON),
  stringify: function(obj, options) {
    var opts = extend({replacer: null, space: 2}, options);
    return JSON.stringify(obj, opts.replacer, opts.space);
  }
};

/**
 * HJSON
 */

engines.hjson = {
  parse: HJSON.parse.bind(HJSON),
  stringify: function(obj, options) {
    var opts = extend({space: 2}, options);
    return HJSON.stringify(obj, opts);
  }
};

/**
 * JavaScript
 */

engines.javascript = {
  parse: function parse(str, options, wrap) {
    /* eslint no-eval: 0 */
    try {
      if (wrap !== false) {
        str = '(function() {\nreturn ' + str.trim() + ';\n}());';
      }
      return eval(str) || {};
    } catch (err) {
      if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
        return parse(str, options, false);
      }
      throw new SyntaxError(err);
    }
  },
  stringify: function() {
    throw new Error('stringifying JavaScript is not supported');
  }
};
