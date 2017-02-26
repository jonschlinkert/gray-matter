'use strict';

require('mocha');
var fs = require('fs');
var isBuffer = require('is-buffer');
var assert = require('assert');
var matter = require('..');

var lineEndings = ['\n', '\r\n'];

lineEndings.forEach(function(lineEnding) {
  describe('Read from strings with lineEnding ' + lineEnding.replace('\n', '\\n').replace('\r', '\\r') + ':', function() {
    it('should extract YAML front matter', function() {
      var actual = matter('---' + lineEnding + 'abc: xyz' + lineEnding + '---');
      assert(actual.hasOwnProperty('data'));
      assert(actual.hasOwnProperty('content'));
      assert(actual.hasOwnProperty('orig'));
      assert.deepEqual(actual.data.abc, 'xyz');
    });

    it('should cache original string as a buffer on the "orig property"', function() {
      var fixture = '---' + lineEnding + 'abc: xyz' + lineEnding + '---';
      var actual = matter(fixture);
      assert(isBuffer(actual.orig));
      assert.equal(actual.orig.toString(), fixture);
    });

    it('should throw parsing errors', function() {
      assert.throws(function() {
        matter('---whatever' + lineEnding + 'abc: xyz' + lineEnding + '---')
      }, /parser/);
    });

    it('should throw an error when a string is not passed:', function() {
      assert.throws(function() {
        matter()
      }, /gray-matter expected a string/);
    });

    it('should return an object when the string is 0 length:', function() {
      assert.deepEqual(matter(''), {orig: new Buffer(''), data: {}, content: ''});
    });

    it('should extract YAML front matter and content', function() {
      var fixture = '---' + lineEnding + 'abc: xyz' + lineEnding + 'version: 2' + lineEnding + '---' + lineEnding + '\n<span class="alert alert-info">This is an alert</span>\n';
      var actual = matter(fixture);
      assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
      assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
      assert.equal(actual.orig.toString(), fixture);
    });

    it('should use a custom delimiter as a string.', function() {
      var fixture = '~~~' + lineEnding + 'abc: xyz' + lineEnding + 'version: 2' + lineEnding + '~~~' + lineEnding + '\n<span class="alert alert-info">This is an alert</span>\n';
      var actual = matter(fixture, {delims: '~~~'});
      assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
      assert.equal(actual.content, '\n<span class="alert alert-info">This is an alert</span>\n');
      assert.equal(actual.orig.toString(), fixture);
    });

    it('should use custom delimiters as an array.', function() {
      var fixture = '~~~' + lineEnding + 'abc: xyz' + lineEnding + 'version: 2' + lineEnding + '~~~' + lineEnding + lineEnding + '<span class="alert alert-info">This is an alert</span>' + lineEnding;
      var actual = matter(fixture, {delims: ['~~~']});
      assert.deepEqual(actual.data, {abc: 'xyz', version: 2});
      assert.equal(actual.content, '' + lineEnding + '<span class="alert alert-info">This is an alert</span>' + lineEnding);
      assert.equal(actual.orig.toString(), fixture);
    });

    it('should correctly identify delimiters and ignore strings that look like delimiters.', function() {
      var fixture = '---' + lineEnding + 'name: "troublesome --- value"' + lineEnding + '---' + lineEnding + 'here is some content' + lineEnding;
      var actual = matter(fixture);
      assert.deepEqual(actual.data, {name: 'troublesome --- value'});
      assert.equal(actual.content, 'here is some content' + lineEnding);
      assert.equal(String(actual.orig), '---' + lineEnding + 'name: "troublesome --- value"' + lineEnding + '---' + lineEnding + 'here is some content' + lineEnding);
    });

    it('should correctly parse a string that only has an opening delimiter.', function() {
      var fixture = '---' + lineEnding + 'name: "troublesome --- value"' + lineEnding;
      var actual = matter(fixture);
      assert.deepEqual(actual.data, {name: 'troublesome --- value'});
      assert.equal(actual.content, '');
      assert.equal(String(actual.orig), '---' + lineEnding + 'name: "troublesome --- value"' + lineEnding);
    });

    it('should not try to parse a string has content that looks like front-matter.', function() {
      var fixture = '-----------name--------------value' + lineEnding + 'foo';
      var actual = matter(fixture);
      assert.deepEqual(actual.data, {});
      assert.equal(actual.content, '-----------name--------------value' + lineEnding + 'foo');
      assert.equal(String(actual.orig), '-----------name--------------value' + lineEnding + 'foo');
    });
  });
});
