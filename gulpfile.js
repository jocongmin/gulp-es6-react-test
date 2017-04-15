var gulp = require('gulp')
var fs = require("fs")
var babelify = require('babelify')
var browserify = require('browserify')
var rename = require('gulp-rename')
var uglifyjs = require('gulp-uglifyjs')



var vendors = ['react', 'react-dom', 'jquery'];

gulp.task('es2015', () => {
	browserify({
			entries: ['./src/main.js'],
			extensions: ['.js', '.jsx'],
			debug: true
		})
		.external(vendors)
		.transform(["babelify", {
			babelrc: false,
			presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
			plugins: ['transform-decorators-legacy']
		}])
		.bundle()
		.pipe(fs.createWriteStream("bundle.js"));
})
gulp.task('vender', () => {
	var bf = browserify({
		debug: true
	});
	vendors.forEach(lib => {
		bf.require(lib);
	});
	bf.transform(["babelify", {
			babelrc: false,
			presets: ['es2015', 'es2016', 'es2017', 'stage-0', 'react'],
			plugins: ['transform-decorators-legacy']
		}])
		.bundle()
		.pipe(fs.createWriteStream("vender.js"));
})
gulp.task('uglifyjs', () => {
	var minjs = ['./bundle.js', './vender.js'];
	minjs.forEach(lib => {
		gulp.src(lib)
			.pipe(uglifyjs())
			.pipe(rename({
				suffix: ".min",
				extname: ".js"
			}))
			.pipe(gulp.dest('./dist'))
	})
})
gulp.task('copyjs', () => {
	gulp.src('./node_modules/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('./dist/'));
})
gulp.task('build:js', () => {
	gulp.run('uglifyjs');
	gulp.run('copyjs');
})
gulp.task('default', () => {
	gulp.run('vender');
	gulp.watch('./src/**/*.js', () => {
		gulp.run('es2015')
	})
})