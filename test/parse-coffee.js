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

describe('parse coffee:', function() {
  it('should throw an error when `eval` is not defined as `true` on the options.', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-coffee.md', {lang: 'coffee', strict: true});
    }, /options\.eval/);
  });

  it('should throw an error when coffee cannot be parsed:', function() {
    assert.throws(function() {
      matter.read('./test/fixtures/lang-coffee-bad.md', {lang: 'coffee', eval: true});
    }, /coffee-script/);
  });

  it('should parse coffee front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-coffee.md', {
      lang: 'coffee',
      eval: true
    });
    assert.equal(actual.data.title, 'coffee');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in coffee front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-coffee-fn.md', {
      lang: 'coffee',
      eval: true
    });
    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'coffee functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in auto-detected coffee front matter.', function() {
    var actual = matter.read('./test/fixtures/autodetect-coffee-fn.md', {
      autodetect: true,
      eval: true
    });
    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'coffee functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect CoffeeScript as the language.', function() {
    var actual = matter.read('./test/fixtures/autodetect-coffee.md', {
      autodetect: true,
      eval: true
    });

    assert.equal(actual.data.title, 'autodetect-coffee');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
