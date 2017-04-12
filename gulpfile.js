var gulp = require('gulp'),
	watch = require('gulp-watch'),
	babel = require('gulp-babel');
var envify = require('gulp-envify');
var browserify = require('gulp-browserify');
var SourceMap = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var SourceMapSupport = require('gulp-sourcemaps-support');
gulp.task('react', () => {
	var environment = {
		NODE_ENV: 'production'
	};
	gulp.src('./es/*.js')
		.pipe(SourceMap.init())
		.pipe(babel({
			babelrc: false,
			plugins: ['transform-es2015-modules-commonjs']
		}))
		.pipe(browserify({
			insertGlobals: true,
			debug: !gulp.env.production,
			ignore:['jquery-3.2.1.min.js']
		}))
		.pipe(babel({
			babelrc: false,
			presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
			plugins: ['transform-decorators-legacy']
		}))
		.pipe(envify(environment))
		.pipe(uglify())
		.pipe(SourceMap.write('.'))
		.pipe(gulp.dest('js'))
});

gulp.task('default', () => {
	return watch('./es/*.js', function() {
		gulp.run('react');
	});
});