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

describe('parse YAML:', function() {
  it('should parse YAML front matter.', function() {
    var actual = matter.read('./test/fixtures/lang-yaml.md');
    assert.equal(actual.data.title, 'YAML');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should detect YAML as the language with no language defined after the first fence.', function() {
    var actual = matter.read('./test/fixtures/autodetect-no-lang.md');
    assert.equal(actual.data.title, 'autodetect-no-lang');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should detect YAML as the language.', function() {
    var actual = matter.read('./test/fixtures/autodetect-yaml.md');
    assert.equal(actual.data.title, 'autodetect-yaml');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should use safeLoad when specified.', function() {
    var fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {safeLoad: true});
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
    assert(actual.hasOwnProperty('orig'));
  });
});
