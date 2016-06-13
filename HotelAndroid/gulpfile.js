const gulp = require('gulp');

const eslint = require('gulp-eslint');
const exec = require('child_process').exec;

const paths = {
  android: ['*.js'],
};

gulp.task('eslint', () =>
  gulp.src([paths.android[0], '!node_modules/**'])
  .pipe(eslint({
    'parser': 'babel-eslint',
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

gulp.task('watch', () => {
  gulp.watch(paths.android, ['eslint']);
});

gulp.task('start', () => {
  exec('react-native run-android', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    console.log(err);
  });
});

gulp.task('default', ['eslint', 'watch', 'start']);
