var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    sourcemaps  = require('gulp-sourcemaps'), // стили файла стайлус в инспекторе
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'), // все скрипты в один файл
    uglify      = require('gulp-uglifyjs'), // сжатие js
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    autopref    = require('gulp-autoprefixer'),
    pug         = require('gulp-pug'),
    imagemin    = require('gulp-imagemin'),
    imJpeg = require('imagemin-jpeg-recompress');


gulp.task('styl', function () {
    gulp.src(['app/stylus/*.styl','!app/stylus/_*.styl'])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true
        }))
        .pipe(autopref(['last 15 versions','> 1%','ie 8', 'ie 7'], {cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('pugbuild', function () {
    return gulp.src('app/pug/*.pug')
        .pipe(pug({
            pretty:true,
        }))
        .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({stream:true}));
});


gulp.task('scripts', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/lightbox2/dist/js/lightbox.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'app/libs/owl.carousel/dist/owl.carousel.js',
        'app/libs/jquery-mask-plugin/dist/jquery.mask.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});


//обновление страницы
gulp.task('browser-sync', function () {
    browserSync({
        port:700,
       server: {
           baseDir:'app'
       },
        notify:false
    });
});


gulp.task('cssmin', ['styl','pugbuild'], function() {
    return gulp.src(['app/css/libs.css','app/css/main.css'])
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'));
});


gulp.task('watch', ['cssmin', 'scripts'], function() {
    gulp.watch('app/stylus/*.styl', ['styl']);
    gulp.watch('app/pug/*.pug', ['pugbuild']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/pug/*.pug', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default',['browser-sync', 'watch']);

//сжатие картинок
gulp.task('img', function() {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imJpeg({
                loops: 5,
                min: 65,
                max: 70,
                quality:'medium'
            }),
            imagemin.svgo(),
            imagemin.optipng({optimizationLevel: 3}),
            pngquant({quality: '65-70', speed: 5})
        ],{
            verbose: true
        })))
        .pipe(gulp.dest('dist/img'));
});


gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('clean', function () {
    return del.sync('dist');
})

//билд проекта
gulp.task('build', ['clean','img', 'styl', 'scripts'], function () {
   var buildCss = gulp.src([
       'app/css/main.min.css',
       'app/css/libs.min.css',
   ])
   .pipe(gulp.dest('dist/css'));

   var buildFonts = gulp.src('app/fonts/**/*')
   .pipe(gulp.dest('dist/fonts'));


   var buildJs = gulp.src('app/js/**/*')
   .pipe(gulp.dest('dist/js'));

   var buildHtml = gulp.src('app/*.html')
   .pipe(gulp.dest('dist'));
});


//github
gulp.task('gohub', function() {
    return gulp.src('dist')
        .pipe(ghPages(
            {
                remoteUrl: 'git@github.com:dvoinyakov/dvoinyakov.git',
                branch: 'master'
            }
        ));
});