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


describe('parse coffee:', function () {
  it('should parse coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-coffee.md', {
      lang: 'coffee'
    });
    actual.data.title.should.equal('coffee');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/lang-coffee-fn.md', {
      lang: 'coffee'
    });
    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('coffee functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should evaluate functions in auto-detected coffee front matter.', function () {
    var actual = matter.read('./test/fixtures/autodetect-coffee-fn.md', {
      autodetect: true
    });
    actual.data.fn.should.be.a.function;
    actual.data.title.should.equal('coffee functions');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });

  it('should auto-detect CoffeeScript as the language.', function () {
    var actual = matter.read('./test/fixtures/autodetect-coffee.md', {
      autodetect: true
    });

    actual.data.title.should.equal('autodetect-coffee');
    actual.should.have.property('data');
    actual.should.have.property('content');
    actual.should.have.property('orig');
  });
});

