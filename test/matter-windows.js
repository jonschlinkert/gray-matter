'use strict';

require('mocha');
var assert = require('assert');
var utils = require('../lib/utils');
var matter = require('..');

describe('gray-matter (windows carriage returns)', function() {
  it('should extract YAML front matter', function() {
    var actual = matter('---\r\nabc: xyz\r\n---');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
    assert.deepEqual(actual.data.abc, 'xyz');
  });

  it('should cache orig string as a buffer on the "orig property"', function() {
    var fixture = '---\r\nabc: xyz\r\n---';
    var actual = matter(fixture);
    assert(utils.isBuffer(actual.orig));
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should throw parsing errors', function() {
    assert.throws(function() {
      matter('---whatever\r\nabc: xyz\r\n---');
    });
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
    var fixture = '---\r\nabc: xyz\r\nversion: 2\r\n---\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\r\n<span class="alert alert-info">This is an alert</span>\r\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should use a custom delimiter as a string.', function() {
    var fixture = '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture, {delims: '~~~'});
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\r\n<span class="alert alert-info">This is an alert</span>\r\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should use custom delimiters as an array.', function() {
    var fixture = '~~~\r\nabc: xyz\r\nversion: 2\r\n~~~\r\n\r\n<span class="alert alert-info">This is an alert</span>\r\n';
    var actual = matter(fixture, {delims: ['~~~']});
    assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
    assert.equal(actual.content, '\r\n<span class="alert alert-info">This is an alert</span>\r\n');
    assert.equal(actual.orig.toString(), fixture);
  });

  it('should correctly identify delimiters and ignore strings that look like delimiters.', function() {
    var fixture = '---\r\nname: "troublesome --- value"\r\n---\r\nhere is some content\r\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {name: 'troublesome --- value'});
    assert.equal(actual.content, 'here is some content\r\n');
    assert.equal(String(actual.orig), '---\r\nname: "troublesome --- value"\r\n---\r\nhere is some content\r\n');
  });

  it('should correctly parse a string that only has an opening delimiter', function() {
    var fixture = '---\r\nname: "troublesome --- value"\r\n';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {name: 'troublesome --- value'});
    assert.equal(actual.content, '');
    assert.equal(String(actual.orig), '---\r\nname: "troublesome --- value"\r\n');
  });

  it('should not try to parse a string has content that looks like front-matter.', function() {
    var fixture = '-----------name--------------value\r\nfoo';
    var actual = matter(fixture);
    assert.deepEqual(actual.data, {});
    assert.equal(actual.content, '-----------name--------------value\r\nfoo');
    assert.equal(String(actual.orig), '-----------name--------------value\r\nfoo');
  });
});
