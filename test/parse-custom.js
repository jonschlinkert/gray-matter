/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var YAML = require('js-yaml');
var matter = require('..');


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
