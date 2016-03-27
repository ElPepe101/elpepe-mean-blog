var gulp = require('gulp')
var runSequence = require('run-sequence')
var browserSync = require('browser-sync').create()
var nodemon = require('gulp-nodemon')
var webpack = require('webpack-stream')

// ····················· WATCH ··························
var watch = function () {
  return gulp
    .watch([
      'dist/**/*.{js,ejs}',
      '!dist/node_modules/*',
      '!dist/public/**/*',
      'src/**/*.{js,html,css,png,jpg,jpeg,gif,mp3,mp4}',
      '!src/node_modules/*'
    ], ['pack'])
}
gulp.task('watch', watch)

// ····················· PACK ··························
var pack = function () {
  return gulp.src('src/app/app.js')
    .pipe(webpack(require('./webpack.conf.js')))
    .pipe(gulp.dest('dist/public/'))
}
gulp.task('pack', pack)

// ····················· SERVE ··························
var serve = function (cb) {
  var started = false

  return nodemon(
    {
      script: 'dist/bin/www',
      ignore: [
        '*conf.js',
        'gulpfile.js',
        'node_modules',
        'dist/node_modules',
        'src'
      ]
    })
    .on('start', function () {
      // to avoid nodemon being started multiple times
      // thanks @matthisk
      if (!started) {
        browserSync.init(null, {
          proxy: 'localhost:' + (process.env.PORT || 3000),
          port: 7000,
          reloadDelay: 500 // https://github.com/BrowserSync/browser-sync/issues/392
        })
        cb()
        started = true
      }

      // Manual BrowserSync reload
      browserSync.reload()
    })
}
gulp.task('serve', serve)

// ····················· DEFAULT ··························
gulp.task('default', function () {
  runSequence('pack', 'serve', 'watch')
})
