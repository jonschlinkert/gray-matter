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
  var expected = {
    data: {
      title: "JSON",
      description: "Front Matter"
    },
    content: "\n\n# This page has JSON front matter!",
    original: "---\n{\n  \"title\": \"JSON\",\n  \"description\": \"Front Matter\"\n}\n---\n\n# This page has JSON front matter!"
  };

  it('should detect language without a language defined.', function (done) {
    expected.original = ";;; json\n{\n  \"title\": \"JSON\",\n  \"description\": \"Front Matter\"\n}\n;;;\n\n# This page has JSON front matter!";
    var actual = matter.read('./test/fixtures/autodetect-json.md', {
      autodetect: true,
      delims: [';;;', ';;;']
    });
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should detect CoffeeScript as the language.', function (done) {
    var actual = matter.read('./test/fixtures/autodetect.md', {
      autodetect: true
    });
    var expected = {
      data: {user: "jonschlinkert"},
      content: "\nContent",
      original: "--- coffee\ndata =\n  user: 'jonschlinkert'\n---\nContent"
    };
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should detect TOML as the language.', function (done) {
    var actual = matter.read('./test/fixtures/autodetect-toml.md', {
      autodetect: true
    });
    var expected = {
      data: {data: {user: "jonschlinkert"}},
      content: "\nContent\n",
      original: "--- toml\n[data]\nuser = \"jonschlinkert\"\n---\nContent\n"
    };
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should detect YAML as the language, although no language is defined after the first fence.', function (done) {
    var actual = matter.read('./test/fixtures/autodetect-no-lang.md', {
      autodetect: true
    });
    var expected = {
      data: {user: "jonschlinkert"},
      content: "\nContent",
      original: "---\nuser: jonschlinkert\n---\nContent"
    };
    expect(actual).to.deep.equal(expected);
    done();
  });

  it('should detect YAML as the language.', function (done) {
    var actual = matter.read('./test/fixtures/autodetect-yaml.md', {
      autodetect: true
    });
    var expected = {
      data: {user: "jonschlinkert"},
      content: "\nContent",
      original: "---yaml\nuser: jonschlinkert\n---\nContent"
    };
    expect(actual).to.deep.equal(expected);
    done();
  });

});

describe('Parse coffee:', function () {
  var expected = {
    data: {
      categories: "front matter coffee coffee-script",
      title: "Coffee",
      description: "Front matter",
    },
    content: "\n\n# This page has coffee front matter!",
    original: "---\ntitle: 'Coffee'\ndescription: '''\n  Front matter\n  '''\ncategories: '''\n  front matter coffee coffee-script\n  '''\n---\n\n# This page has coffee front matter!"
  };

  it('should parse coffee front matter.', function (done) {
    var actual = matter.read('./test/fixtures/coffee.md', {
      lang: 'coffee'
    });
    expect(actual).to.deep.equal(expected);
    done();
  });
  it('should evaluate functions in coffee front matter.', function (done) {
    var actual = matter.read('./test/fixtures/coffee-fn.md', {
      autodetect: true
    });
    expect(typeof actual.data).to.equal('function');
    done();
  });
});

describe('Parse toml:', function () {
  var expected = {
    data: {
      title: "TOML",
      description: "Front matter",
      categories: "front matter toml"
    },
    content: "\n\n# This page has toml front matter!\n",
    original: "---\ntitle = \"TOML\"\ndescription = \"Front matter\"\ncategories = \"front matter toml\"\n---\n\n# This page has toml front matter!\n"
  };

  it('should parse toml front matter.', function (done) {
    var actual = matter.read('./test/fixtures/toml.md', {
      lang: 'toml'
    });
    expect(actual).to.deep.equal(expected);
    done();
  });
});

