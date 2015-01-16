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

describe('parse coffee:', function () {
  it('should throw an error when `eval` is not defined as `true` on the options.', function() {
    (function() {
      matter.read('./test/fixtures/lang-coffee.md', {lang: 'coffee', strict: true});
    }).should.throw('[gray-matter]: to parse coffee set `options.eval` to `true`');
  });

  it('should throw an error when coffee cannot be parsed:', function() {
    (function() {
      matter.read('./test/fixtures/lang-coffee-bad.md', {lang: 'coffee', eval: true});
    }).should.throw('gray-matter parser [coffee-script]: ReferenceError: data is not defined');
  });

  it('should parse coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-coffee.md', {
      lang: 'coffee',
      eval: true
    });
    actual.data.title.should.equal('coffee');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-coffee-fn.md', {
      lang: 'coffee',
      eval: true
    });
    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('coffee functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in auto-detected coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/autodetect-coffee-fn.md', {
      autodetect: true,
      eval: true
    });
    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('coffee functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect CoffeeScript as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-coffee.md', {
      autodetect: true,
      eval: true
    });

    actual.data.title.should.equal('autodetect-coffee');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

