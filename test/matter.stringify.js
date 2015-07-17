/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter.git>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var fs = require('fs');
var _ = require('lodash');
var matter = require('..');
var pkg = require('../package');

describe('.stringify()', function () {

  it('should extract front matter, extend it, and convert it back to front matter.', function () {
    var data = {name: pkg.name};
    var res = matter.stringify('Name: {{name}}', data);
    res.should.equal([
      '---',
      'name: gray-matter',
      '---',
      'Name: {{name}}\n'
    ].join('\n'));
  });

  it('should use custom delimiters.', function () {
    var data = {name: pkg.name};
    var res = matter.stringify('Name: {{name}}', data, {delims: '~~~'});
    res.should.equal([
      '~~~',
      'name: gray-matter',
      '~~~',
      'Name: {{name}}\n'
    ].join('\n'));
  });
});
