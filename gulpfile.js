/*
Xianqing Zou - CS554 - Lab1
*/

const gulp = require('gulp');
const concatenate = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoPrefix = require('gulp-autoprefixer');
const gulpSASS = require('gulp-sass');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');

const sassFiles = [
  './src/styles/variables.scss',
  './src/styles/custom.scss',
  './src/styles/bootstrap/scss/_variables.scss',
];

const vendorJsFiles = [
  './src/styles/jquery/dist/jquery.js',
  './src/styles/popper.js/dist/umd/popper.min.js',
  './src/styles/bootstrap/dist/js/bootstrap.js',
];

const imgSource = './src/imgs/*.+(png|jpg)';

gulp.task('sass', function (done) {
  gulp
    .src(sassFiles)
    .pipe(gulpSASS())
    .pipe(concatenate('styles.css'))
    .pipe(gulp.dest('./public/css/'))
    .pipe(autoPrefix())
    .pipe(cleanCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./public/css/'));
  done();
});

gulp.task('js:vendor', function (done) {
  gulp.src(vendorJsFiles).pipe(concatenate('vendor.min.js')).pipe(gulp.dest('./public/js/'));
  done();
});

gulp.task('imgmin', function (done) {
  gulp.src(imgSource).pipe(changed('./public/imgs')).pipe(imagemin()).pipe(gulp.dest('./public/imgs'));
  done();
});

gulp.task('build', gulp.parallel(['sass', 'js:vendor', 'imgmin']));

gulp.task('watch', function (done) {
  gulp.watch(sassFiles, gulp.series('sass'));
  gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
  gulp.watch(imgSource, gulp.series('imgmin'));
  done();
});

gulp.task('default', gulp.series('watch'));
