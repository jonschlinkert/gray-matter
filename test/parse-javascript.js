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

describe('parse javascript:', function() {
  it('should throw when "options.eval" is not true', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-javascript-fn.md', {lang: 'javascript', strict: true});
    }, /options\.eval/);
  });

  it('should parse javascript front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-javascript-fn.md', {
      lang: 'javascript',
      eval: true
    });

    assert.equal(actual.data.title, 'javascript front matter');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect javascript front matter.', function() {
    var actual = matter.read('./test/fixtures/autodetect-javascript.md', {
      autodetect: true,
      eval: true
    });

    assert.equal(typeof actual.data.fn.reverse, 'function');
    assert.equal(actual.data.title, 'autodetect-javascript');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in javascript front matter.', function() {
    var actual = matter.read('./test/fixtures/autodetect-javascript.md', {
      autodetect: true,
      eval: true
    });

    assert.equal(actual.data.title, 'autodetect-javascript');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
