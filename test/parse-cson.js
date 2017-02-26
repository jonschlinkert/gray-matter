/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var matter = require('..');

describe('parse cson:', function() {
  it('should parse CSON front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-cson.md', {
      lang: 'cson',
      eval: true
    });

    assert.equal(actual.data.title, 'CSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in CSON front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-cson-fn.md', {
      lang: 'cson',
      eval: true
    });

    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'CSON functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in auto-detected CSON front matter.', function() {
    var actual = matter.read('./test/fixtures/autodetect-cson-fn.md', {
      autodetect: true,
      eval: true
    });

    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'CSON functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect cson as the language.', function() {
    var actual = matter.read('./test/fixtures/autodetect-cson.md', {
      autodetect: true,
      eval: true
    });

    assert.equal(actual.data.title, 'autodetect-CSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
