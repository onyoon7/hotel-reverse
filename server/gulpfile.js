'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
let Cache = require('gulp-file-cache');
let cache = new Cache();
let mocha = require('gulp-mocha');
let paths = {
  server: ['./src/**/*.js'],
  test: ['./specs/server/*.js'],
};

gulp.task('babel', () =>
  gulp.src(paths.server)
  .pipe(cache.filter())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(cache.cache())
  .pipe(gulp.dest('build'))
);

gulp.task('eslint',() =>
  gulp.src(paths.server)
  .pipe(eslint({
    'parserOptions' : {
      'ecmaVersion' : 6,
      'sourceType' : 'module',
    },
    'rules' : {
      'indent' : ['error',2],
      'comma-dangle'  : ['error', 'only-multiline'],
      'semi' : ['error', 'always', { 'omitLastInOneLineBlock' : true}]
    }
  }))
  .pipe(eslint.format())
);

gulp.task('webpack', () =>
  gulp.src('').pipe(webpack(require('./webpack.config.js')))
);

gulp.task('serve', ['babel'], () => {
  nodemon({
    script: 'build/server.js',
    watch: 'src',
    tasks: ['babel']
  });
});

gulp.task('test', () =>
  gulp.src(paths.test, {read: false})
    .pipe(mocha()));

gulp.task('default', ['babel', 'webpack', 'serve']);
