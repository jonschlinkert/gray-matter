/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var matter = require('..');

describe('.excerpt', function() {
  it('should get an excerpt after front matter', function() {
    var file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent', {excerpt: true});

    assert.equal(file.matter, '\nabc: xyz');
    assert.equal(file.content, 'foo\nbar\nbaz\n---\ncontent');
    assert.equal(file.excerpt, 'foo\nbar\nbaz\n');
    assert.deepEqual(file.data.abc, 'xyz');
  });

  it('should not get excerpt when disabled', function() {
    var file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent');

    assert.equal(file.matter, '\nabc: xyz');
    assert.equal(file.content, 'foo\nbar\nbaz\n---\ncontent');
    assert.equal(file.excerpt, '');
    assert.deepEqual(file.data.abc, 'xyz');
  });

  it('should use a custom function to get excerpt', function() {
    var file = matter('---\nabc: xyz\n---\nfoo\nbar\nbaz\n---\ncontent', {
      excerpt: function(file) {
        file.excerpt = 'custom';
      }
    });

    assert.equal(file.matter, '\nabc: xyz');
    assert.equal(file.content, 'foo\nbar\nbaz\n---\ncontent');
    assert.equal(file.excerpt, 'custom');
    assert.deepEqual(file.data.abc, 'xyz');
  });
});
