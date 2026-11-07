'use strict';

var assert = require('assert');
var matter = require('..');

describe('cache metadata', function() {
  afterEach(function() {
    matter.clearCache();
  });

  it('should preserve raw front-matter and language on repeated calls', function() {
    ['---\ntitle: Title\n---', '---json\n{"title":"Title"}\n---'].forEach(function(input) {
      var initial = matter(input);
      var cached = matter(input);
      assert.notStrictEqual(cached, initial);
      assert.strictEqual(cached.matter, initial.matter);
      assert.strictEqual(cached.language, initial.language);
      assert.strictEqual(Object.prototype.propertyIsEnumerable.call(cached, 'matter'), false);
      assert.strictEqual(Object.prototype.propertyIsEnumerable.call(cached, 'language'), false);
    });
  });
});
