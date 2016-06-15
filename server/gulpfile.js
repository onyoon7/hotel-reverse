'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint')
const nodemon = require('gulp-nodemon');
const paths = {
  server : ['server.js'],
  admin : ['./admin/index.html'],
  manager : ['./manager/index.html'],
}

gulp.task('eslint',() =>
  gulp.src([paths.server[0],paths.admin[0],paths.manager[0],'!node_modules/**'])
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
)

gulp.task('watch', () =>{
  gulp.watch(paths.server[0],['eslint']);
  gulp.watch(paths.manager[0],['eslint']);
  gulp.watch(paths.admin[0],['eslint']);
})

gulp.task('serve', () => {
  nodemon({
    script: 'server.js',
    ignore: 'node_modules/**/*.js'
  });
});

gulp.task('default', ['eslint','serve','watch']);
