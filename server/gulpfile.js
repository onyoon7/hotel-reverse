'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const paths = {
  eslint: ['./**/*.js', '!public/**', '!node_modules/**'],
  babel: ['./**/*.js', '!public/**', '!admin/**', '!manager/**', '!node_modules/**'],
};

gulp.task('babel', () =>
  gulp.src(paths.babel)
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('babel'))
);

gulp.task('eslint',() =>
  gulp.src(paths.eslint)
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

gulp.task('watch', () => {
  gulp.watch(paths.eslint, ['eslint']);
  gulp.watch(paths.babel, ['babel']);
});

gulp.task('webpack', () =>
  gulp.src('').pipe(webpack(require('./webpack.config.js')))
);

gulp.task('serve', () => {
  nodemon({
    script: 'babel/server.js',
    ignore: 'node_modules/**'
  });
});

gulp.task('default', ['babel', 'webpack', 'eslint', 'serve', 'watch']);
