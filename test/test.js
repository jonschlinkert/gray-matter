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

var expected = {context: {foo: 'bar'}, content: '', original: '---\nfoo: bar\n---'};
var complexExpected = {
  context: {foo: 'bar', version: 2},
  content: '\n\n<span class="alert alert-info">This is an alert</span>\n',
  original: '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n'
};
var customDelims = {
  context: {"foo": 'bar', "version": 2},
  content: '\n\n<span class="alert alert-info">This is an alert</span>\n',
  original: '~~~\nfoo: bar\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n'
};
var empty = {
  context: {},
  content: "",
  original: ""
};

var contentOnly = {
  context: {},
  content: "# This file doesn't have matter!",
  original: "# This file doesn't have matter!"
};


describe('Read from strings:', function() {
  var matterOnly = '---\nfoo: bar\n---';
  var matterAndContent = '---\nfoo: bar\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';

  it('should extract YAML front matter directly from a string when with "read: false" is defined', function(done) {
    var actual = matter(matterOnly);
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should extract YAML front matter and content directly from a string when with "read: false" is defined', function(done) {
    var actual = matter(matterAndContent);
    expect(actual).to.deep.equal(complexExpected);
    done();
  });
});


describe('Read from file system:', function() {
  it('should extract YAML front matter from files with content.', function(done) {
    var actual = matter.read('./test/fixtures/alpha.hbs');
    expect(actual).to.deep.equal(complexExpected);
    done();
  });

  it('should have no problem with complex content.', function(done) {
    var actual = matter.read('./test/fixtures/complex.md');
    var expected = file.readJSONSync('./test/expected/complex.json');
    expect(actual).to.deep.equal(expected);
    done();
  });
});


describe('Use custom delimiters:', function() {
  it('should use custom delimiters.', function(done) {
    var actual = matter.read('./test/fixtures/custom-delims.md', {delims: ['~~~', '~~~']});
    expect(actual).to.deep.equal(customDelims);
    done();
  });
});


describe('Parse JSON:', function() {

  var expected = {
    context: {
      title: "JSON",
      "description": "Front Matter"
    },
    content: "\n\n# This page has JSON front matter!",
    original: "---\n{\n  \"title\": \"JSON\",\n  \"description\": \"Front Matter\"\n}\n---\n\n# This page has JSON front matter!"
  };

  it('should parse JSON front matter.', function(done) {
    var actual = matter.read('./test/fixtures/json.md', {lang: 'json'});
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should parse JSON front matter with custom delimiters.', function(done) {
    expected.original = ";;;\n{\n  \"title\": \"JSON\",\n  \"description\": \"Front Matter\"\n}\n;;;\n\n# This page has JSON front matter!";
    var actual = matter.read('./test/fixtures/json-semi-colons.md', {lang: 'json', delims: [';;;', ';;;']});
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should autodetect language and parse JSON front matter.', function(done) {
    expected.original = ";;; json\n{\n  \"title\": \"JSON\",\n  \"description\": \"Front Matter\"\n}\n;;;\n\n# This page has JSON front matter!";
    var actual = matter.read('./test/fixtures/json-autodetect.md', {autodetect: 'true', delims: [';;;', ';;;']});
    expect(actual).to.deep.equal(expected);
    done();
  });
});

describe('Parse coffee:', function() {
  var expected = {
    context: {
      categories: "front matter coffee coffee-script",
      title: "Coffee",
      description: "Front matter",
    },
    content: "\n\n# This page has coffee front matter!",
    original: "---\ntitle: 'Coffee'\ndescription: '''\n  Front matter\n  '''\ncategories: '''\n  front matter coffee coffee-script\n  '''\n---\n\n# This page has coffee front matter!"
  };

  it('should parse coffee front matter.', function(done) {
    var actual = matter.read('./test/fixtures/coffee.md', {lang: 'coffee'});
    expect(actual).to.deep.equal(expected);
    done();
  });
  it('should evaluate functions in coffee front matter.', function(done) {
    var actual = matter.read('./test/fixtures/coffee-fn.md', {autodetect: true});
    expect(typeof actual.context).to.equal('function');
    done();
  });
});

describe('Autodetect language:', function() {
  var expected = {
    context: 'jonschlinkert',
    content: "\nContent",
    original: "--- coffee\nuser = 'jonschlinkert'\n---\nContent"
  };
  it('should autodetect front matter language, and use the correct parser.', function(done) {
    var actual = matter.read('./test/fixtures/autodetect.md', {autodetect: true});
    expect(actual).to.deep.equal(expected);
    done();
  });
});

describe('Read empty files:', function() {
  it('should return an object, even if the file is empty.', function(done) {
    var actual = matter.read('./test/fixtures/empty.md');
    expect(actual).to.deep.equal(empty);
    done();
  });
});

describe('Read files with no matter:', function() {
  it('should correctly parse files that have content but no YAML front matter.', function(done) {
    var actual = matter.read('./test/fixtures/content-only.md');
    expect(actual).to.deep.equal(contentOnly);
    done();
  });
});

describe('Read YAML files:', function() {
  it('should parse YAML directly from .yaml files. e.g. files with no content.', function(done) {
    var actual = matter.read('./test/fixtures/metadata.yml');
    expect(actual).to.deep.equal(file.readJSONSync('test/expected/metadata.json'));
    done();
  });
});


describe('Custom delimiters:', function() {
  it('should use custom delimiters to read YAML front matter.', function(done) {
    var actual = matter.read('./test/fixtures/alpha.hbs');
    expect(actual).to.deep.equal(complexExpected);
    done();
  });
});


describe('Check for matter:', function() {
  it('should return true or false if YAML front matter exists.', function(done) {
    var actual = matter.exists('./test/fixtures/alpha.hbs');
    expect(actual).to.equal(true);
    done();
  });
});

