/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var matter = require('../');

describe('parse javascript:', function() {
  it('should parse front matter when options.lang is javascript', function() {
    var file = matter.read('./test/fixtures/lang-javascript-object-fn.md', {
      lang: 'javascript'
    });

    assert.equal(file.data.title, 'javascript front matter');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert.equal(typeof file.data.fn.reverse, 'function');
  });

  it('should parse front matter when options.language is js', function() {
    var file = matter.read('./test/fixtures/lang-javascript-object-fn.md', {
      language: 'js'
    });

    assert.equal(file.data.title, 'javascript front matter');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
    assert.equal(typeof file.data.fn.reverse, 'function');
  });

  it('should eval functions', function() {
    var file = matter.read('./test/fixtures/lang-javascript-fn.md', {language: 'js'});
    assert.equal(typeof file.data, 'function');
  });

  it('should detect "javascript" after the first delimiter', function() {
    var file = matter.read('./test/fixtures/autodetect-javascript.md');
    assert.equal(file.data.title, 'autodetect-javascript');
    assert.equal(file.data.title, 'autodetect-javascript');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });
});
