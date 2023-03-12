'use strict';

require('mocha');
var assert = require('assert');
var utils = require('../lib/utils');
var matter = require('..');

describe('gray-matter', function() {
  it('should extract YAML front matter', function() {
    var actual = matter('---\nabc: xyz\n---');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
    assert.deepEqual(actual.data.abc, 'xyz');
  });

  it('should cache original string as a buffer on the "orig property"', function() {
    var fixture = '---\nabc: xyz\n---';
    var actual = matter(fixture);
    assert(utils.isBuffer(actual.orig));
    assert.equal(actual.orig.toString(), fixture);
  });

  it('extra characters should throw parsing errors', function() {
    assert.throws(function() {
      matter('---whatever\nabc: xyz\n---');
    });
  });

  it('boolean yaml types should still return the empty object', function() {
    var actual = matter('--- true\n---');
    assert.deepEqual(actual.data, {});
  });

  it('string yaml types should still return the empty object', function() {
    var actual = matter('--- true\n---');
    assert.deepEqual(actual.data, {});
  });

  it('number yaml types should still return the empty object', function() {
    var actual = matter('--- 42\n---');
    assert.deepEqual(actual.data, {});
  });

  it('should throw an error when a string is not passed:', function() {
    assert.throws(function() {
      matter();
    });
  });

  it('should return an object when the string is 0 length:', function() {
    assert(utils.isObject(matter('')));
  });

  it('should extract YAML front matter and content', function() {
    var fixture = '---\nabc: xyz\nversion: 2\n---\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should use a custom delimiter as a string.', function() {
    var fixture = '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {delims: '~~~'});
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should use custom delimiters as an array.', function() {
    var fixture = '~~~\nabc: xyz\nversion: 2\n~~~\n\n<span class="alert alert-info">This is an alert</span>\n';
    var actual = matter(fixture, {delims: ['~~~']});
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should correctly identify delimiters and ignore strings that look like delimiters.', function() {
    var fixture = '---\nname: "troublesome --- value"\n---\nhere is some content\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {name: 'troublesome --- value'});
    assert.equal(actual.content, 'here is some content\n');
    assert.equal(String(actual.orig), '---\nname: "troublesome --- value"\n---\nhere is some content\n');
  });

  it('should correctly parse a string that only has an opening delimiter', function() {
    var fixture = '---\nname: "troublesome --- value"\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {name: 'troublesome --- value'});
    assert.equal(actual.content, '');
    assert.equal(String(actual.orig), '---\nname: "troublesome --- value"\n');
  });

  it('should not try to parse a string has content that looks like front-matter.', function() {
    var fixture = '-----------name--------------value\nfoo';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {});
    assert.equal(actual.content, '-----------name--------------value\nfoo');
    assert.equal(String(actual.orig), '-----------name--------------value\nfoo');
  });
});
