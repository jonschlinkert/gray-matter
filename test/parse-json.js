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
    var actual = matter.read('./test/fixtures/autodetect-json.md');
    actual.data.title.should.equal('autodetect-JSON');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});
