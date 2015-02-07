/*!
 * gray-matter <https://github.com/assemble/gray-matter>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
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
    var actual = matter.read('./test/fixtures/autodetect-no-lang.md');
    actual.data.title.should.equal('autodetect-no-lang');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should detect YAML as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-yaml.md');
    actual.data.title.should.equal('autodetect-yaml');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should use safeLoad when specified.', function () {
    var fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {safeLoad: true});
    actual.should.have.property('data', {abc: 'xyz', version: 2});
    actual.should.have.property('content', '\n\n<span class="alert alert-info">This is an alert</span>\n');
    actual.should.have.property('orig');
  });
});
