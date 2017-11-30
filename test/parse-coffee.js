/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var path = require('path');
var assert = require('assert');
var extend = require('extend-shallow');
var matter = require('../');
var fixture = path.join.bind(path, __dirname, 'fixtures');
var coffee = require('coffeescript');
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

describe('parse coffee', function() {
  it('should throw an error when coffee cannot be parsed', function() {
    assert.throws(function() {
      parse('lang-coffee-bad.md', {lang: 'coffee'});
    });
  });

  it('should parse coffee front matter', function() {
    var file = parse('lang-coffee.md', {lang: 'coffee'});
    assert.equal(file.data.title, 'coffee');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should eval functions in coffee front matter', function() {
    var file = parse('lang-coffee-fn.md', {lang: 'coffee'});

    assert.equal(typeof file.data.fn, 'function');
    assert.equal(file.data.title, 'coffee functions');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should eval functions in auto-detected coffee front matter', function() {
    var file = parse('autodetect-coffee-fn.md');
    assert.equal(typeof file.data.fn, 'function');
    assert.equal(file.data.title, 'coffee functions');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should detect "coffee" as the language', function() {
    var file = parse('autodetect-coffee.md');
    assert.equal(file.data.title, 'autodetect-coffee');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });

  it('should detect "coffeescript" as the language', function() {
    var file = parse('autodetect-coffeescript.md');
    assert.equal(file.data.title, 'autodetect-coffeescript');
    assert(file.hasOwnProperty('data'));
    assert(file.hasOwnProperty('content'));
    assert(file.hasOwnProperty('orig'));
  });
});
