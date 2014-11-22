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

describe('Read from file system:', function () {
  it('should extract YAML front matter from files with content.', function () {
    var actual = matter.read('./test/fixtures/basic.txt');

    actual.should.have.property('path');
    actual.should.have.property('data', {title: 'Basic'});
    actual.should.have.property('content', 'this is content.');
  });

  it('should parse complex YAML front matter.', function () {
    var actual = matter.read('./test/fixtures/complex.md');

    actual.should.have.property('path');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
    actual.data.should.have.property('root');
    actual.data.root.should.equal('_gh_pages');
  });

  it('should return an object when a file is empty.', function () {
    var actual = matter.read('./test/fixtures/empty.md');
    actual.should.have.property('path');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should return an object when no front matter exists.', function () {
    var actual = matter.read('./test/fixtures/hasnt-matter.md');
    actual.should.have.property('path');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should parse YAML files directly', function () {
    var actual = matter.read('./test/fixtures/a.yml');
    actual.should.have.property('path');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});
