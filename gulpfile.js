'use strict';

var gulp = require('gulp');
var sysBuilder = require('systemjs-builder');
var uglify = require('gulp-uglify');
var del = require('del');
var tslint = require('gulp-tslint');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var ghPages = require('gulp-gh-pages');
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('clean', function (cb) {
  return del(['build', 'src/**/*.js', '!src/system.config.js', 'src/**/*.js.map', 'src/**/*.d.ts', '!src/typings.d.ts', '*.js', '!gulpfile.js', '!gulp.config.js', '*.js.map', '*.d.ts'], cb);
});

gulp.task('tslint', function (done) {
  return gulp.src('src/**/*.ts')
      .pipe(tslint({ configuration: './tslint.json' }))
      .pipe(tslint.report('prose', {
        emitError: false
      }));
})

gulp.task('compile', function () {
  var tsResult = gulp.src('src/**/*.ts')
      .pipe(sourcemaps.init())
      .pipe(tsc(tsProject));

  return tsResult.js
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build'));
});

gulp.task('resources', function () {
  return gulp.src(['src/**/*', '!**/*.ts'])
      .pipe(gulp.dest('build'));
});

gulp.task('libs', function () {
  return gulp.src([
          'core-js/client/shim.min.js',
          'systemjs/dist/system-polyfills.js',
          'systemjs/dist/system.src.js',
          'reflect-metadata/Reflect.js',
          'rxjs/**',
          'zone.js/dist/**',
          '@angular/**',
          'moment/**'
  ], { cwd: 'node_modules/**' }) /* Glob required here. */
      .pipe(gulp.dest('build/lib'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.ts'], ['compile']).on('change', function (e) {
    console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
  });
  gulp.watch(['src/**/*.html', 'src/**/*.css'], ['resources']).on('change', function (e) {
    console.log('Resource file ' + e.path + ' has been changed. Updating.');
  });
});

gulp.task('build', ['compile', 'resources', 'libs'], function () {
  console.log('Building the project ...');
});

gulp.task('bundle:demo', ['build'], function (done) {
  var builder = new sysBuilder('./build', './build/system.config.js');

  return builder.buildStatic('app', './build/bundle.min.js', { runtime: false })
    .then(function () {
      return del(['build/**/*.js', '!build/lib/**/*.js', '!build/bundle.min.js']);
      done();
    }).catch(function (err) {
      console.error('systemjs-builder Bundling failed');
    });
});

gulp.task('bundle:demo:min', ['bundle:demo'], function () {
  return gulp
    .src('build/bundle.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('production', ['bundle:demo:min'], function () {
  console.log('Demo Production is ready...');
});

gulp.task('publish', ['production'], function () {
  return gulp.src("./build/**/*")
		 .pipe(ghPages());
});