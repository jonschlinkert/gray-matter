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


describe('parse json:', function () {
  it('should parse JSON front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-json.md', {
      lang: 'json'
    });

    actual.data.title.should.equal('JSON');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect JSON as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-json.md', {
      autodetect: true
    });

    actual.data.title.should.equal('autodetect-JSON');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

describe('autodetect JSON with custom delims', function () {
  it('should detect language from the delims, without a language passed on the options.', function () {
    var actual = matter.read('./test/fixtures/delims-semi-colons.md', {
      autodetect: true,
      delims: [';;;', ';;;']
    });

    actual.data.should.have.property('title');
    actual.data.title.should.equal('delims-semi-colons JSON');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

});
