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


describe('parse YAML:', function () {
  it('should parse YAML front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-yaml.md');
    actual.data.title.should.equal('YAML');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should detect YAML as the language with no language defined after the first fence.', function () {
    var actual = matter.read('./test/fixtures/autodetect-no-lang.md', {
      autodetect: true
    });
    actual.data.title.should.equal('autodetect-no-lang');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should detect YAML as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-yaml.md', {
      autodetect: true
    });
    actual.data.title.should.equal('autodetect-yaml');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});
