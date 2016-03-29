var gulp = require('gulp')
var runSequence = require('run-sequence')
var browserSync = require('browser-sync').create()
var nodemon = require('gulp-nodemon')
var webpack = require('webpack-stream')
var notifier = require('node-notifier')

// ····················· WATCH ··························
var watch = function () {
  return gulp
    .watch([
      // 'views/**/*.{js,ejs}',
      '!node_modules',
      '!public/**/*',
      'public/src/**/*.{js,html,css,png,jpg,jpeg,gif,mp3,mp4}'
    ], ['pack'])
}
gulp.task('watch', watch)

// ····················· PACK ··························
var pack = function () {
  notifier.notify('Packing')
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
      script: 'bin/www',
      ignore: [
        '*config.js',
        'gulpfile.js',
        'node_modules',
        'public/src'
      ]
    })
    .on('start', function () {
      // to avoid nodemon being started multiple times
      // thanks @matthisk
      if (!started) {
        browserSync.init(null, {
          proxy: 'localhost:' + (process.env.PORT || 3000),
          port: 7000,
          reloadDelay: 1000 // https://github.com/BrowserSync/browser-sync/issues/392
        })
        cb()
        started = true
      }

      // Manual BrowserSync reload
      notifier.notify('Reloading browser')
      browserSync.reload()
    })
}
gulp.task('serve', serve)

// ····················· DEFAULT ··························
gulp.task('default', function () {
  runSequence('pack', 'serve', 'watch')
})
