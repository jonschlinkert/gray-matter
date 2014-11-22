'use strict';

var path = require('path');
var glob = require('glob');

/**
 * Sanity check
 *
 * Run to ensure that all fns return the same result.
 */

glob.sync(__dirname + '/code/*.js').forEach(function (fp) {
  var fn = require(path.resolve(__dirname, 'code', fp));
  console.log(fp)

  glob.sync(__dirname + '/fixtures/{lang,matter}.js').forEach(function (fp) {
    var args = require(path.resolve(__dirname, 'fixtures', fp));
    console.log(fn.apply(fn, args));
  });
});
