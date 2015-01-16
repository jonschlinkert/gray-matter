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

describe('parse javascript:', function () {
  it('should throw an error when `eval` is not defined as `true` on the options.', function() {
    (function() {
      matter.read('./test/fixtures/lang-javascript-fn.md', {lang: 'javascript', strict: true});
    }).should.throw('[gray-matter]: to parse javascript set `options.eval` to `true`');
  });

  it('should parse javascript front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-javascript-fn.md', {
      lang: 'javascript',
      eval: true
    });

    actual.data.title.should.equal('javascript front matter');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect javascript front matter.', function () {
    var actual = matter.read('./test/fixtures/autodetect-javascript.md', {
      autodetect: true,
      eval: true
    });

    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('autodetect-javascript');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in javascript front matter.', function () {
    var actual = matter.read('./test/fixtures/autodetect-javascript.md', {
      autodetect: true,
      eval: true
    });

    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('autodetect-javascript');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

