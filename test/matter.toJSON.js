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



describe('stringify to JSON:', function () {
  it('should stringify YAML front matter to JSON.', function () {
    var fixture = fs.readFileSync('test/fixtures/to-json.md', 'utf8');
    var actual = matter.toJSON(fixture);

    actual.should.be.an.object;
    actual.should.have.property('title');
    actual.title.should.equal('to JSON');
  });
});
