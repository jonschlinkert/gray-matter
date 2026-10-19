'use strict';

require('mocha');
var assert = require('assert');
var fs = require('fs');
var os = require('os');
var path = require('path');
var matter;

describe('gray-matter cache', function() {
  beforeEach(function() {
    delete require.cache[require.resolve('..')];
    matter = require('..');
  });

  afterEach(function() {
    matter.clearCache();
  });

  ['constructor', 'toString', '__proto__', 'hasOwnProperty'].forEach(function(content) {
    it('should parse and cache plain content named ' + content, function() {
      for (var cycle = 0; cycle < 2; cycle++) {
        for (var read = 0; read < 2; read++) {
          var file = matter(content);
          assert.strictEqual(file.content, content);
          assert.deepEqual(file.data, {});
          assert.strictEqual(file.orig.toString(), content);
          assert.strictEqual(file.isEmpty, false);
          assert.strictEqual(file.excerpt, '');
        }
        matter.clearCache();
      }
    });
  });

  it('should keep cached documents independent of prototype-named content', function() {
    var source = '---\ntitle: Example\n---\nbody';
    matter(source);
    matter('__proto__');
    matter('constructor');
    var file = matter(source);
    assert.deepEqual(file.data, { title: 'Example' });
    assert.strictEqual(file.content, 'body');
    assert.strictEqual(file.orig.toString(), source);
    assert.strictEqual(matter('__proto__', {}).content, '__proto__');
  });

  it('should read a file whose contents match a prototype property', function() {
    var directory = fs.mkdtempSync(path.join(os.tmpdir(), 'gray-matter-cache-'));
    var filename = path.join(directory, 'post.md');
    try {
      fs.writeFileSync(filename, 'constructor');
      for (var i = 0; i < 2; i++) {
        var file = matter.read(filename);
        assert.strictEqual(file.content, 'constructor');
        assert.deepEqual(file.data, {});
        assert.strictEqual(file.path, filename);
        assert.strictEqual(file.orig.toString(), 'constructor');
      }
    } finally {
      fs.unlinkSync(filename);
      fs.rmdirSync(directory);
    }
  });
});
