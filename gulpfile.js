'use strict';
const gulp          = require('gulp');
const cssmin        = require('gulp-cssmin');
const concat        = require('gulp-concat');
const uglify        = require('gulp-uglify');
const pump          = require('pump');
const sass          = require('gulp-sass');
const babel         = require('gulp-babel');
const ngAnnotate    = require('gulp-ng-annotate');

const sassFiles     = './public/**/*.scss';
const jsFiles       = ['./public/app/**/*.js'];

////////////////////////////////////////////////////////////

gulp.task('sass', function () {
    pump([
        gulp.src(sassFiles),
        concat('styles.min.css'),
        sass().on('error', sass.logError),
        cssmin(),
        gulp.dest('./public/dist/')
    ])
});

gulp.task('compress', function () {
    pump([
        gulp.src(jsFiles),
        babel({
            presets: ['env']
        }).on('error', err => console.log('Babel error! ', err)),
        concat('bundle.js'),
        ngAnnotate({
            mangle: true
        }),
        uglify({
            compress: {
                pure_funcs: ['console.log', 'c.log']
            },
            mangle: true
        }),
        gulp.dest('./public/dist/')
    ]);
});

gulp.task('ngannotate', function () {
    return gulp.src('./public/app/app.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('.'));
});

gulp.task('watchAll', function () {
    gulp.watch(sassFiles, ['sass']);
    gulp.watch(jsFiles, ['compress-dev']);
});

gulp.task('default', ['sass', 'compress']);
gulp.task('dev', ['compress-dev', 'sass', 'watchAll']);
