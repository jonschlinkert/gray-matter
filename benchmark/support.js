'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var extend = require('extend-shallow');
var sortObj = require('sort-object');
var forOwn = require('for-own');
var chalk = require('chalk');
var glob = require('glob');

/**
 * Sanity check. Run to ensure that all fns return the same result.
 */

module.exports = function (options) {
  var opts = extend({cwd: __dirname}, options);
  var fixtures = files(opts.cwd, opts.fixtures, opts);
  var libs = files(opts.cwd, opts.code, opts);
  var res = {};

  libs.forEach(function (fp) {
    var fn = require(cwd('code', fp));
    var lib = path.basename(fp);
    var res = {};
    res[lib] = {};

    fixtures.forEach(function (fixture) {
      var filename = path.basename(fixture);

      var args = require(cwd('fixtures', fixture));
      var actual = fn.apply(fn, args);
      res[lib][filename] = actual;

      console.log(name(fixture, lib), actual);
    });

    var filepath = path.join(process.cwd(), 'tmp', lib);
    forOwn(res, function (value, key) {
      forOwn(value, function (v, k) {
        value[k] = sortObj(v);
      });
    });


    fs.writeFileSync(filepath, util.inspect(res, null, 10));
  });

}

function cwd() {
  var args = [__dirname].concat.apply([], arguments);
  return path.resolve.apply(path, args);
}

function files(cwd, patterns, opts) {
  return glob.sync(path.join(cwd, patterns), opts);
}

function name(fp, prefix) {
  return chalk.gray(path.basename(fp)) + chalk.bold((prefix ? ' (' + prefix + ')' : ''));
}
