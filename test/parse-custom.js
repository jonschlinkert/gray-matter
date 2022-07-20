/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



import  'mocha';
import assert from 'assert';
import utils  from '../lib/utils.js';
import matter  from '../dist/index.js';
import YAML from 'js-yaml';

describe('custom parser:', function() {
  it('should allow a custom parser to be registered:', function() {
    var actual = matter.read('./test/fixtures/lang-yaml.md', {
      parser: function customParser(str, opts) {
        try {
          return YAML.safeLoad(str, opts);
        } catch (err) {
          throw new SyntaxError(err);
        }
      }
    });

    assert.equal(actual.data.title, 'YAML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
