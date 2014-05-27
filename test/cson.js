/**
 * Gray Matter
 * https://github.com/assemble/gray-matter
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var expect = require('chai').expect;

// node_modules
var file = require('fs-utils');
var _ = require('lodash');

// Local libs
var matter = require('../');



describe('autodetect CSON', function () {
  it('should detect cson as the language.', function (done) {
    var actual = matter.read('./test/fixtures/autodetect-cson.md', {
      autodetect: true
    });
    var expected = {
      data: {user: "jonschlinkert"},
      content: "\nContent",
      original: "---cson\nuser: 'jonschlinkert'\n---\nContent"
    };
    expect(actual).to.deep.equal(expected);
    done();
  });
});

describe('Parse cson:', function () {
  var expected = {
    data: {
      categories: "front matter cson",
      title: "cson",
      description: "Front matter",
    },
    content: "\n\n# This page has cson front matter!",
    original: "---\ntitle: 'cson'\ndescription: '''\n  Front matter\n  '''\ncategories: '''\n  front matter cson\n  '''\n---\n\n# This page has cson front matter!"
  };

  it('should parse cson front matter.', function (done) {
    var actual = matter.read('./test/fixtures/cson.md', {
      lang: 'cson'
    });
    expect(actual).to.deep.equal(expected);
    done();
  });
  it('should evaluate functions in cson front matter.', function (done) {
    var actual = matter.read('./test/fixtures/cson-fn.md', {
      autodetect: true
    });
    expect(typeof actual.data).to.equal('function');
    done();
  });
});