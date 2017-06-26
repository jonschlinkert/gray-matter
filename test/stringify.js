/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var stringify = require('../lib/stringify');

describe('.stringify', function() {
  it('should stringify front-matter from a file object', function() {
    var file = {
      content: 'Name: {{name}}\n',
      data: {name: 'gray-matter'}
    };

    assert.equal(stringify(file), [
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n',
    ].join('\n'));
  });

  it('should stringify from a string', function() {
    assert.equal(stringify('Name: {{name}}\n'), 'Name: {{name}}\n');
  });

  it('should use custom delimiters to stringify', function() {
    var data = {name: 'gray-matter'};
    var actual = stringify('Name: {{name}}', data, {delims: '~~~'});
    assert.equal(actual, [
      '~~~',
      'name: gray-matter',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify a file object', function() {
    var file = { content: 'Name: {{name}}', data: {name: 'gray-matter'} };
    var actual = stringify(file);
    assert.equal(actual, [
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify an excerpt', function() {
    var file = { content: 'Name: {{name}}', data: {name: 'gray-matter'} };
    file.excerpt = 'This is an excerpt.';

    assert.equal(stringify(file), [
      '---',
      'name: gray-matter',
      '---',
      'This is an excerpt.',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should not add an excerpt if it already exists', function() {
    var file = { content: 'Name: {{name}}\n\nThis is an excerpt.', data: {name: 'gray-matter'} };
    file.excerpt = 'This is an excerpt.';

    assert.equal(stringify(file), [
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n\nThis is an excerpt.\n'
    ].join('\n'));
  });
});
