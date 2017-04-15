var gulp = require('gulp'),
	watch = require('gulp-watch'),
	babel = require('gulp-babel');
var envify = require('gulp-envify');
var browserify = require('gulp-browserify');
var SourceMap = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');

gulp.task('tojs', () => {
	return gulp.src('./es/**/*.js')
		.pipe(babel({
			babelrc: false,
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(gulp.dest('.rjs'))
		.on('end',()=>{
			gulp.run('toes6')
		});
});
gulp.task('toes6', () => {
	gulp.src('./.rjs/index.js')
		.pipe(browserify({
			transform:[babel({
				
			})]
			insertGlobals: true,
			debug: !gulp.env.production,
			ignore: ['jquery-3.2.1.min.js']
		}))
		.pipe(babel({
			babelrc: false,
			presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
			plugins: ['transform-decorators-legacy']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('js'))
})


gulp.task('default', () => {
	gulp.watch('./es/**/*.js',()=>{
		gulp.run('tojs');
	})
});