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

describe('Read from file system:', function() {
  it('should extract YAML front matter from files with content.', function() {
    var actual = matter.read('./test/fixtures/basic.txt');

    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data', {title: 'Basic'}));
    assert.equal(actual.content, 'this is content.');
  });

  it('should parse complex YAML front matter.', function() {
    var actual = matter.read('./test/fixtures/complex.md');

    assert(actual.hasOwnProperty('data'));
    assert.equal(actual.data.root, '_gh_pages');

    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
    assert(actual.data.hasOwnProperty('root'));
  });

  it('should return an object when a file is empty.', function() {
    var actual = matter.read('./test/fixtures/empty.md');
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should return an object when no front matter exists.', function() {
    var actual = matter.read('./test/fixtures/hasnt-matter.md');
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should parse YAML files directly', function() {
    var actual = matter.read('./test/fixtures/a.yml');
    assert(actual.hasOwnProperty('path'));
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
