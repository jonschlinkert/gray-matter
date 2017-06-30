/*!
 * gray-matter <https://github.com/jonschlinkert/gray-matter>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var assert = require('assert');
var matter = require('..');

describe('.language', function() {
  it('should detect the name of the language to parse', function() {
    assert.deepEqual(matter.language('---\nfoo: bar\n---'), {
      raw: '',
      name: ''
    });
    assert.deepEqual(matter.language('---js\nfoo: bar\n---'), {
      raw: 'js',
      name: 'js'
    });
    assert.deepEqual(matter.language('---coffee\nfoo: bar\n---'), {
      raw: 'coffee',
      name: 'coffee'
    });
  });

  it('should work around whitespace', function() {
    assert.deepEqual(matter.language('--- \nfoo: bar\n---'), {
      raw: ' ',
      name: ''
    });
    assert.deepEqual(matter.language('--- js \nfoo: bar\n---'), {
      raw: ' js ',
      name: 'js'
    });
    assert.deepEqual(matter.language('---  coffee \nfoo: bar\n---'), {
      raw: '  coffee ',
      name: 'coffee'
    });
  });
});
