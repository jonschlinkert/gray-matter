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

describe('.stringify()', function () {

  it('should extract front matter, extend it, and convert it back to front matter.', function () {
    var res = matter.stringify('Name: {{author.name}}', pkg.author);
    res.should.equal([
      '---',
      'name: Jon Schlinkert',
      'url: "https://github.com/jonschlinkert"',
      '---',
      'Name: {{author.name}}\n'
    ].join('\n'));
  });
});

