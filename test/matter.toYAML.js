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


describe('stringify to YAML:', function () {
  it('should stringify YAML front matter back to YAML.', function () {
    var fixture = fs.readFileSync('test/fixtures/to-yaml.md', 'utf8');
    var actual = matter.toYAML(fixture);

    actual.should.equal('"---\\ntitle: to YAML\\n---"\n');
  });
});
