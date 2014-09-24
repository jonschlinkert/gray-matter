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


describe('parse TOML:', function () {
  it('should parse toml front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-toml.md', {
      lang: 'toml'
    });

    actual.data.title.should.equal('TOML');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect TOML as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-toml.md', {
      autodetect: true
    });

    actual.data.title.should.equal('autodetect-TOML');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

