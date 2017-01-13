var gulp = require('gulp');
var download = require('gulp-download');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var minifyCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var closureCompiler = require('google-closure-compiler').gulp({ requireStreamInput: true });
var processhtml = require('gulp-processhtml');
var del = require('del');
var src = require('gulp-src');
gulp.task('clean', function () {
    return gulp.src(['js/*.*', 'css/*.*'], { read: false })
    .pipe(clean());
});
gulp.task('get',['clean'], function () {
    //javascript files
    download([
        'https://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-route.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0-rc.0/angular-animate.min.js',
        'https://allpeopleunited.blob.core.windows.net/referendum/createDialog.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/ng-dialog/0.5.6/js/ngDialog.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
        'https://allpeopleunited.blob.core.windows.net/referendum/angular-auto-focus.min.js',
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',
        'https://cdn.jsdelivr.net/bootstrap.filestyle/1.1.0/js/bootstrap-filestyle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js',
        'https://allpeopleunited.blob.core.windows.net/referendum/jquery.signalR-2.1.0.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.9/angular-aria.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/angular-resource/1.5.9/angular-resource.min.js'
    ]).pipe(gulp.dest('js/'));
    //css files
    download([
        'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ng-dialog/0.5.6/css/ngDialog.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/ng-dialog/0.5.6/css/ngDialog-theme-default.css',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/css/jasny-bootstrap.min.css',
        'https://allpeopleunited.blob.core.windows.net/allpeopleunited/referendum.css',
        'https://allpeopleunited.blob.core.windows.net/allpeopleunited/referendum.min.css'
    ]).pipe(gulp.dest('css/'));
});
gulp.task('css', ['get'], function () {
    return [
      gulp.src(['css/referendum.css'])
      .pipe(minifyCSS())
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
      .pipe(concat('css/referendum.min.css'))
      .pipe(gulp.dest(''))
    ];
});
gulp.task('jsModule', ['css'], function () {
    return [gulp.src('./Modules/modules.js', { base: './' })
        .pipe(newer('./Modules/modules.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'modules.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./Modules/modules.js', { base: './' })
        .pipe(newer('./Modules/modules.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'modules.min.js'
        }))
        .pipe(gulp.dest('./Modules'))
    ];
});
gulp.task('jsController', ['jsModule'], function () {
    return [gulp.src('./Controllers/controllers.js', { base: './' })
        .pipe(newer('./Controllers/controllers.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'controllers.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./Controllers/controllers.js', { base: './' })
        .pipe(newer('./Controllers/controllers.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'controllers.min.js'
        }))
        .pipe(gulp.dest('./Controllers'))
    ];
});
gulp.task('jsDirective', ['jsController'], function () {
    return [gulp.src('./Directives/directives.js', { base: './' })
        .pipe(newer('./Directives/directives.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'directives.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./Directives/directives.js', { base: './' })
        .pipe(newer('./Directives/directives.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'directives.min.js'
        }))
        .pipe(gulp.dest('./Directives'))
    ];
});
gulp.task('jsFactories', ['jsDirective'], function () {
    return [gulp.src('./Factories/factories.js', { base: './' })
        .pipe(newer('./Factories/factories.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'factories.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./Factories/factories.js', { base: './' })
        .pipe(newer('./Factories/factories.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'factories.min.js'
        }))
        .pipe(gulp.dest('./Factories'))
    ];
});
gulp.task('jsSWLoad', ['jsFactories'], function () {
    return [gulp.src('./swLoad.js', { base: './' })
        .pipe(newer('swLoad.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'swLoad.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./swLoad.js', { base: './' })
        .pipe(newer('./swLoad.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'swLoad.min.js'
        }))
        .pipe(gulp.dest('.'))
    ];
});
gulp.task('jsSW', ['jsSWLoad'], function () {
    return [gulp.src('./swStart.js', { base: './' })
        .pipe(newer('swStart.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'swStart.min.js'
        }))
        .pipe(gulp.dest('./')),
        gulp.src('./swStart.js', { base: './' })
        .pipe(newer('./swStart.min.js'))
        .pipe(closureCompiler({
            compilation_level: 'WHITESPACE_ONLY',
            js_output_file: 'swStart.min.js'
        }))
        .pipe(gulp.dest('.'))
    ];
});
gulp.task('app', ['jsSW'], function () {
    return gulp.src(['Modules/modules.min.js', 'Directives/directives.min.js', 'Factories/factories.min.js', 'Controllers/controllers.min.js', 'swStart.min.js'])
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('./'));
});
gulp.task('browserSync', ['app'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('start', function (callback) {
    runSequence(['app'],
        'browserSync');
});