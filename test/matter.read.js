/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var assert = require('assert');
var matter = require('..');
var fixture = path.join.bind(path, __dirname, 'fixtures');

describe('.read', function() {
  it('should extract YAML front matter from files with content.', function() {
    var actual = matter.read(fixture('basic.txt'));

    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data', {title: 'Basic'}));
    assert.equal(actual.content, 'this is content.');
  });

  it('should parse complex YAML front matter.', function() {
    var actual = matter.read(fixture('complex.md'));

    assert(actual.hasOwnProperty('data'));
    assert.equal(actual.data.root, '_gh_pages');

    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
    assert(actual.data.hasOwnProperty('root'));
  });

  it('should return an object when a file is empty.', function() {
    var actual = matter.read(fixture('empty.md'));
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should return an object when no front matter exists.', function() {
    var actual = matter.read(fixture('hasnt-matter.md'));
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should parse YAML files directly', function() {
    var actual = matter.read(fixture('a.yml'));
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
