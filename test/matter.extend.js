/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var matter = require('..');
var pkg = require('../package');

describe('.extend()', function () {
  it('should extract front matter, extend it, and convert it back to front matter.', function () {
    var yfm = '---\ntitle: ABC\n---\nThis is content.';
    var actual = matter.extend(yfm, pkg.author);

    var expected = [
      '---',
      'title: ABC',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '---'
    ].join('\n')

    expected.should.equal(actual);
  });
});

