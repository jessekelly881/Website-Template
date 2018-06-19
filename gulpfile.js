var gulp        = require('gulp');
var sass        = require('gulp-sass');
var autoprefix  = require('gulp-autoprefixer');
var pug       	= require('gulp-pug');
var minifyHtml  = require("gulp-minify-html");
var cleanCSS 	= require('gulp-clean-css');
var rename 	= require("gulp-rename");
var livereload  = require('gulp-livereload');
var plumber     = require('gulp-plumber');

gulp.task('pug', function buildHTML(){
  return gulp.src('src/pug/*.pug')
  .pipe(plumber())
  .pipe(pug({pretty: true}))
  .pipe(gulp.dest('build'))
  .pipe(livereload());
});

gulp.task('sass', function () {
  return gulp.src('src/sass/index.sass')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('build'))
  .pipe(livereload());
});


gulp.task('watch', function () { //TODO: Stop the produced css file from triggering recompile
  livereload.listen({reloadPage:'build/index.html'});
  gulp.watch('./src/sass/**/*.sass', ['sass']); //Whenever a file in the css folder changes recompile the sass files
  gulp.watch('./src/pug/**/*.pug', ['pug']);  //Whenever a file in the pug folder changes recompile the pug files
});

gulp.task('default', ['watch', 'sass', 'pug']);


/*
gulp.task('sass-min', function () {
  gulp.src('css/main.sass')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest('css'))
})
*/

/*
gulp.task('pug-min', function () {
  gulp.src("html/*.html")
  .pipe(plumber())
  .pipe(minifyHtml())
  .pipe(rename({suffix: ".min"}))
  .pipe(gulp.dest('html'));
})
*/
