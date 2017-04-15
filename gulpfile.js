var gulp = require('gulp')
var fs = require("fs")
var babelify = require('babelify')
var browserify = require('browserify')
var rename=require('gulp-rename')
var uglifyjs = require('gulp-uglifyjs')

gulp.task('es2015', () => {
	browserify("./src/main.js")
		.transform(["babelify", {
			babelrc: false,
			presets: ['es2015', 'es2016', 'es2017', 'stage-0','react'],
			plugins: ['transform-decorators-legacy']
		}])
		.bundle()
		.pipe(fs.createWriteStream("bundle.js"));
})
gulp.task('uglifyjs',()=>{
	gulp.src('./bundle.js')
		.pipe(uglifyjs())
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest('./dist'))
})
gulp.task('default', () => {
	gulp.watch('./src/**/*.js', () => {
		gulp.run('es2015')
	})
})