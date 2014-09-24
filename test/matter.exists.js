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


describe('.exists()', function () {
  it('should return true if front matter exists.', function () {
    var fixture = fs.readFileSync('test/fixtures/has-matter.md', 'utf8');
    var actual = matter.exists(fixture);
    actual.should.be.true;
  });

  it('should return true or false if YAML front matter exists.', function () {
    var fixture = fs.readFileSync('test/fixtures/hasnt-matter.md', 'utf8');
    var actual = matter.exists(fixture);
    actual.should.be.false;
  });
});
