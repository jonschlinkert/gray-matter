'use strict';

var path = require('path');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var uglify = require('gulp-uglify');
var mocha = require('gulp-mocha');

gulp.task('coverage', function(cb) {
  gulp.src(['index.js', 'lib/parsers.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/*.js'])
        .pipe(mocha())
        .pipe(istanbul.writeReports())
        .on('end', cb);
    });
});

gulp.task('uglify', function(cb) {
  var base = path.dirname(require.resolve('js-yaml'));
  gulp.src(path.resolve(base, 'dist/js-yaml.js'))
    .pipe(uglify())
    .pipe(gulp.dest('lib/'))
    .on('end', cb)
});

gulp.task('default', ['coverage', 'uglify']);


