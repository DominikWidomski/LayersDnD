var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', function() {});

gulp.task("build", function () {
	var babelifyConfig = {
	      plugins: [
	         'add-module-exports'
	         // 'transform-es2015-modules-umd',
	         // 'transform-remove-console'
	      ]
	   };
	   var browserifyInstance = browserify({
	         debug: true,
	         entries: 'src/js/main.js',
	         standalone: ''
	      })
	      .transform('babelify', babelifyConfig);

	   return browserifyInstance
	      .bundle()
	      .pipe(source('main.js'))
	      .pipe(buffer())
	      .pipe(sourcemaps.init({
	               loadMaps: true
	            }))
         .pipe(uglify())
         .pipe(sourcemaps.write('./'))
	      .pipe(gulp.dest('dist'));

  // return gulp.src("src/js/**/*")
  //   .pipe(babel())
  //   .pipe(browserify())
  //   .pipe(gulp.dest("dist"));
});