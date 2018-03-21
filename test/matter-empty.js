'use strict';

require('mocha');
var assert = require('assert');
var utils = require('../lib/utils');
var matter = require('..');

describe('gray-matter', function() {
  it('should work with empty front-matter', function() {
    var file1 = matter('---\n---\nThis is content');
    assert.equal(file1.content, 'This is content');
    assert.deepEqual(file1.data, {});

    var file2 = matter('---\n\n---\nThis is content');
    assert.equal(file2.content, 'This is content');
    assert.deepEqual(file2.data, {});

    var file3 = matter('---\n\n\n\n\n\n---\nThis is content');
    assert.equal(file3.content, 'This is content');
    assert.deepEqual(file3.data, {});
  });

  it('should add content with empty front matter to file.empty', function() {
    assert.deepEqual(matter('---\n---').empty, '---\n---');
  });

  it('should update file.isEmpty to true', function() {
    assert.deepEqual(matter('---\n---').isEmpty, true);
  });

  it('should work when front-matter has comments', function() {
    const fixture = '---\n # this is a comment\n# another one\n---';
    assert.deepEqual(matter(fixture).empty, fixture);
  });
});
