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

describe('parse TOML:', function() {
  it('should parse toml front matter.', function() {
    var actual = matter('---\ntitle = "TOML"\ndescription = "Front matter"\ncategories = "front matter toml"\n---\n\n# This file has toml front matter!\n', {
      lang: 'toml'
    });
    assert.equal(actual.data.title, 'TOML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect TOML as the language.', function() {
    var actual = matter('---toml\ntitle = "autodetect-TOML"\n[props]\nuser = "jonschlinkert"\n---\nContent\n');
    assert.equal(actual.data.title, 'autodetect-TOML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should NOT throw on TOML syntax errors when `strict` is NOT defined.', function() {
    assert.doesNotThrow(function() {
      matter('---toml\n[props\nuser = "jonschlinkert"\n---\nContent\n');
    });
  });

  it('should throw on TOML syntax errors when `strict` IS defined.', function() {
    assert.throws(function() {
      matter('---toml\n[props\nuser = "jonschlinkert"\n---\nContent\n', {strict: true});
    }, /TOML/);
  });
});
