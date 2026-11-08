'use strict';

var assert = require('assert');
var matter = require('..');

describe('cache after parsing succeeds', function() {
  afterEach(function() {
    matter.clearCache();
    delete matter.engines.cachetest;
  });

  ['---\n{}+\n---\nbody', '---json\n{"a":}\n---\nbody'].forEach(function(input) {
    ['string', 'buffer', 'object'].forEach(function(type) {
      it('rethrows invalid front matter for repeated ' + type + ' input: ' + input.slice(0, 8), function() {
        for (var i = 0; i < 3; i++) {
          var value = type === 'buffer' ? Buffer.from(input) : type === 'object' ? { content: input } : input;
          assert.throws(function() { matter(value); });
          assert.strictEqual(Object.prototype.hasOwnProperty.call(matter.cache, input), false);
        }
      });
    });
  });

  it('retries an engine after failure and caches success under the original input', function() {
    var input = '---cachetest\nvalue\n---\nbody';
    var calls = 0;
    var failure = new Error('temporary parse failure');
    matter.engines.cachetest = function() {
      calls++;
      if (calls === 1) throw failure;
      return { title: 'parsed' };
    };
    assert.throws(function() { matter(input); }, function(err) { return err === failure; });
    var first = matter(input);
    var cached = matter(input);
    assert.strictEqual(calls, 2);
    assert.strictEqual(first.content, 'body');
    assert.deepStrictEqual(first.data, { title: 'parsed' });
    assert.deepStrictEqual(cached.data, first.data);
    assert.strictEqual(matter.cache[input], first);
    assert.strictEqual(matter('body').content, 'body');
    assert.deepStrictEqual(matter('body').data, {});
  });

  it('does not cache successful calls with explicit options', function() {
    var input = '---cachetest\nvalue\n---\nbody';
    var calls = 0;
    matter.engines.cachetest = function() { return { count: ++calls }; };
    assert.strictEqual(matter(input, {}).data.count, 1);
    assert.strictEqual(matter(input, {}).data.count, 2);
    assert.strictEqual(Object.prototype.hasOwnProperty.call(matter.cache, input), false);
  });

  it('keeps successful empty front matter and plain text cache behavior', function() {
    ['---\n# comment\n---\nbody', 'plain text'].forEach(function(input) {
      var first = matter(input);
      assert.strictEqual(matter.cache[input], first);
      assert.strictEqual(matter(input).content, first.content);
      assert.deepStrictEqual(matter(input).data, first.data);
    });
  });
});
