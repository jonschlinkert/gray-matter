/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import { expect, it, describe } from "vitest";

import matter from '../src/index';

describe('.stringify', function() {
  it('should stringify front-matter from a file object', function() {
    var file = {
      content: 'Name: {{name}}\n',
      data: {name: 'gray-matter'}
    };

    expect(matter.stringify(file.content, file.data)).toEqual([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify from a string', function() {
    expect(matter.stringify('Name: {{name}}\n')).toEqual('Name: {{name}}\n');
  });

  it('should use custom delimiters to stringify', function() {
    var data = {name: 'gray-matter'};
    var actual = matter.stringify('Name: {{name}}', data, {delimiters: '~~~'});
    expect(actual).toEqual([
      '~~~',
      'name: gray-matter',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify a file object', function() {
    var file = { content: 'Name: {{name}}', data: {name: 'gray-matter'} };
    var actual = matter.stringify(file);
    expect(actual).toEqual([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should stringify an excerpt', function() {
    var file = { content: 'Name: {{name}}', data: {name: 'gray-matter'} };
    file.excerpt = 'This is an excerpt.';

    expect(matter.stringify(file)).toEqual([
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

    expect(matter.stringify(file)).toEqual([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n\nThis is an excerpt.\n'
    ].join('\n'));
  });
});
