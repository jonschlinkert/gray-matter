/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var assert = require('assert');
var matter = require('..');
var extend = require('extend-shallow');
var coffee = require('coffeescript');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var defaults = {
  engines: {
    coffee: {
      parse: function(str, options) {
        /* eslint no-eval: 0 */
        return coffee['eval'](str, options);
      }
    }
  }
};

function parse(name, options) {
  return matter.read(fixture(name), extend({}, defaults, options));
}

describe('parse cson:', function() {
  it('should parse CSON front matter.', function() {
    var actual = parse('lang-cson.md', {
      language: 'cson'
    });

    assert.equal(actual.data.title, 'CSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in CSON front matter.', function() {
    var actual = parse('lang-cson-fn.md', {
      language: 'cson'
    });

    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'CSON functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should evaluate functions in auto-detected CSON front matter.', function() {
    var actual = parse('autodetect-cson-fn.md');
    assert.equal(typeof actual.data.fn, 'function');
    assert.equal(actual.data.title, 'CSON functions');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });

  it('should auto-detect cson as the language.', function() {
    var actual = parse('autodetect-cson.md');

    assert.equal(actual.data.title, 'autodetect-CSON');
    assert(actual.hasOwnProperty('data'));
    assert(actual.hasOwnProperty('content'));
    assert(actual.hasOwnProperty('orig'));
  });
});
