/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var matter = require('..');

describe('parse hjson:', function() {
  it('should parse HJSON front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-hjson.md', {
      lang: 'hjson'
    });

    assert.equal(actual.data.title, 'HJSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect HJSON as the language.', function() {
    var actual = matter.read('./test/fixtures/autodetect-hjson.md');

    assert.equal(actual.data.title, 'autodetect-HJSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
