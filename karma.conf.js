// Karma configuration
// Generated on Mon Mar 21 2016 22:58:37 GMT-0600 (CST)
// Based on https://github.com/preboot/angular-webpack/blob/master/karma.conf.js

var loaders = require('./webpack.loaders')
loaders.css.loader = 'style-loader'

var webpack = require('./webpack.conf')
// webpack.devtool = 'inline-source-map'
webpack.devtool = ''
webpack.entry = {}
webpack.output = {}
webpack.plugins = []
webpack.module.loaders = [
  loaders.babel,
  loaders.css,
  loaders.file,
  loaders.html
]
webpack.module.preLoaders = [{
  // ISPARTA LOADER
  // Reference: https://github.com/ColCh/isparta-instrumenter-loader
  // Instrument JS files with Isparta for subsequent code coverage reporting
  // Skips node_modules and files that end with .test.js
  test: /\.js$/,
  exclude: [
    /node_modules/,
    /\.spec\.js$/
  ],
  loader: 'isparta-instrumenter'
}]
// webpack.resolve.extensions = ['', '.js', '.css']

module.exports = function (config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    files: [
      // Grab all files in the app folder that contain .spec.
      'src/tests.webpack.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'src/tests.webpack.js': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'progress',

      // Reference: https://www.npmjs.com/package/karma-htmlfile-reporter
      // Output detailed results files
      'html',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'reports/coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'html'}
      ]
    },

    htmlReporter: {
      outputFile: 'reports/tests/units.html'
    },

    webpack: webpack,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  })
}
