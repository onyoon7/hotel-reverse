const gulp = require('gulp');

const eslint = require('gulp-eslint');
const exec = require('child_process').exec;

const paths = {
  android: ['index.android.js'],
};

gulp.task('eslint', () =>
  gulp.src([paths.android[0], '!node_modules/**'])
  .pipe(eslint({
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "rules": {
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "comma-dangle": ["error", "only-multiline"],
        "semi": ["error", "always", { "omitLastInOneLineBlock": true}]
    }
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
