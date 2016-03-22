var gulp = require('gulp')

var test = function () {
  var karma = karma({
    configFile: 'karma.conf.js',
    action: 'run'
  })

  var error = function (err) {
    // Make sure failed tests cause gulp to exit non-zero
    console.log(err)
    this.emit('end') // instead of erroring the stream, end it
  }

  return gulp
    .src('./test')
    .pipe(karma)
    .on('error', error)
}
gulp.task('test', test)

var autotest = function () {
  return gulp
    .watch([
      'config/*.js',
      'models/*.js',
      'views/*.ejs',
      'routes/*.js',
      'test/*Spec.js'
    ], ['test'])
}
gulp.task('autotest', autotest)
