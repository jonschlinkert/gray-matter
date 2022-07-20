/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
import 'mocha';
import assert from 'assert';
import matter  from '../dist/index.js';
import coffee from 'coffeescript';
import { join } from "node:path";
import { dirname } from "pathe";
import { fileURLToPath } from 'url';

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

const fixture = (f) => join(  _dirname, 'fixtures', f);
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
  return matter.read(fixture(name), {...defaults, ...options});
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
