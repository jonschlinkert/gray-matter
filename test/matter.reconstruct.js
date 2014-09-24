/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var fs = require('fs');
var _ = require('lodash');
var matter = require('..');
var pkg = require('../package');

describe('.reconstruct()', function () {
  it('should extract front matter, extend it, and put it back.', function () {
    var yfm = '---\ntitle: ABC\n---\nThis is content.';

    matter.reconstruct(yfm, pkg.author).should.equal([
      '---',
      'title: ABC',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '---',
      'This is content.'
    ].join('\n'));
  });
});

