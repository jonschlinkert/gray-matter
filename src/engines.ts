import yaml from 'js-yaml';
import parse from './parse';

/**
 * Default engines
 */

const engines = {
  yaml: {
    parse: yaml.load.bind(yaml),
    stringify: yaml.dump.bind(yaml)
  },
  json: {
    parse: JSON.parse.bind(JSON),
    stringify: function(obj: any, options: any) {
      const opts = Object.assign({replacer: null, space: 2}, options);
      return JSON.stringify(obj, opts.replacer, opts.space);
    }
  },

  javascript(str: any, options: any, wrap: any) {
    /* eslint no-eval: 0 */
    try {
      if (wrap !== false) {
        str = '(function() {\nreturn ' + str.trim() + ';\n}());';
      }
      return eval(str) || {};
    } catch (err) {
      if (wrap !== false && /(unexpected|identifier)/i.test((err as Error).message)) {
        return parse(str, options, false);
      }
      throw new SyntaxError((err as Error).message);
    }
  },

  stringify() {
    throw new Error('stringifying JavaScript is not supported');
  }
};

export default engines;
