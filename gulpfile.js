const gulp = require('gulp');
const minifyCss = require('gulp-minify-css');
const uglify = require('gulp-uglify-es').default;
const cssAutoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');

function font() {
    return gulp.src('assets/font/**/*')
               .pipe(gulp.dest('dist/font'))
    ;
}

function js() {
    del('dist/js/app.min.js');
    return gulp.src('js/index.js')
               .pipe(uglify())
               .pipe(rename('app.min.js'))
               .pipe(gulp.dest('./dist/js'))
    ;
}

function styles() {
    del('dist/css/app.min.css');
    return gulp.src('scss/style.scss')
               .pipe(sass()) // SCSS -> CSS
               .pipe(cssAutoPrefixer())
               .pipe(minifyCss())
               .pipe(rename('app.min.css'))
               .pipe(gulp.dest('./dist/css'))
    ;
}

function img() {
    return gulp.src('assets/img/**/*')
               .pipe(imagemin())
               .pipe(gulp.dest('dist/img'))
    ;
}

gulp.task('js', js);
gulp.task('styles', styles);
gulp.task('font', font);
gulp.task('img', img);

gulp.task('default', gulp.parallel('styles', 'js', 'font', 'img'));

gulp.task('watch', () => {
    gulp.watch('scss/style.scss', styles);
    return gulp.watch('js/index.js', js);
});
