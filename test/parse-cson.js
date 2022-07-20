/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

import 'mocha';
import assert from 'assert';
import matter from '../dist/index.js';
import extend from 'extend-shallow';
import coffee from 'coffeescript';
import { join } from 'node:path';
import { dirname } from 'pathe';
import { fileURLToPath } from 'url';

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url));

const fixture = (f) => join(_dirname, 'fixtures', f);

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
