/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var assert = require('assert');
var pkg = require('../package');
var matter = require('..');

describe('.stringify()', function() {
  it('should create and stringify front-matter', function() {
    var data = {name: pkg.name};
    var actual = matter.stringify('Name: {{name}}', data);
    assert.equal(actual, [
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should use custom delimiters.', function() {
    var data = {name: pkg.name};
    var actual = matter.stringify('Name: {{name}}', data, {delims: '~~~'});
    assert.equal(actual, [
      '~~~',
      'name: gray-matter',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });
});
