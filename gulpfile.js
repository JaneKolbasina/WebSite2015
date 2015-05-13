var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    jade = require('gulp-jade'),
    uglifyjs = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

var paths = {
    dest: 'public',
    styles: ['source/**/*.css'],
    scripts: ['source/**/*.js'],
    templates: ['source/**/*.jade', '!source/**/_*.jade'],
    images: ['source/photos/*.jpg']
};

/*gulp.task('vendor.scripts', function() {
    var files = [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-route/angular-route.min.js'
    ];
    return gulp.src(files)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.dest));
});*/

gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('site.js'))
        //.pipe(uglifyjs())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(concat('site.css'))
        //.pipe(minifycss())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('templates', function() {
    var options = {
        pretty: true
    };
    return gulp.src(paths.templates)
        .pipe(jade(options))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('images', function() {
    var options = {
        progressive: true
    };
    return gulp.src(paths.images)
        .pipe(imagemin(options))
        .pipe(gulp.dest(paths.dest + '/photos'));
});

gulp.task('build', ['scripts', 'styles', 'templates', 'images']);

gulp.task('server', ['build'], function() {
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.templates.slice(0, 1), ['templates']);
    gulp.watch(paths.images, ['images']);

    var options = {
        livereload: false,
        open: false
    };
    return gulp.src(paths.dest)
        .pipe(webserver(options));
});

gulp.task('default', ['build']);