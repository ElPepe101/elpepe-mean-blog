// Based on https://github.com/preboot/angular-webpack
'use strict'

// Modules
var webpack = require('webpack')
var loaders = require('./webpack.loaders')
var autoprefixer = require('autoprefixer')
// var CompressionPlugin = require('compression-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var BrowserSyncPlugin = require('browser-sync-webpack-plugin')

/**
 * Config
 * Reference: http://webpack.github.io/docs/configuration.html
 * This is the object where all configuration gets set
 */
var config = {}

config.cache = true // Somebody is watching

/**
 * Entry
 * Reference: http://webpack.github.io/docs/configuration.html#entry
 * Should be an empty object if it's generating a test build
 * Karma will set this when it's a test build
 */
config.entry = {
  app: './public/src/app/app.js'
}

/**
 * Output
 * Reference: http://webpack.github.io/docs/configuration.html#output
 * Should be an empty object if it's generating a test build
 * Karma will handle setting it up for you when it's a test build
 */
config.output = {
  // Absolute output directory
  path: __dirname + '/public/js',

  // Output path from the view of the page
  // Uses webpack-dev-server in development
  publicPath: '/public/js/',

  // Filename for entry points
  // Only adds hash in build mode
  filename: 'app.min.js',

  // Filename for non-entry points
  // Only adds hash in build mode
  chunkFilename: 'app.min.js',

  // http://webpack.github.io/docs/build-performance.html
  pathinfo: true
}

/**
 * Devtool
 * Reference: http://webpack.github.io/docs/configuration.html#devtool
 * Type of sourcemap to use per build type
 */
// config.devtool = 'source-map'
config.devtool = 'eval'

/**
 * Loaders
 * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
 * List: http://webpack.github.io/docs/list-of-loaders.html
 * This handles most of the magic responsible for converting modules
 */

// Initialize module
config.module = {
  preLoaders: [],
  loaders: [
    loaders.babel,
    loaders.css,
    loaders.file,
    loaders.html
  ]
}

/**
 * PostCSS
 * Reference: https://github.com/postcss/autoprefixer-core
 * Add vendor prefixes to your css
 */
config.postcss = [
  autoprefixer({
    browsers: ['last 2 version']
  })
]

/**
 * Plugins
 * Reference: http://webpack.github.io/docs/configuration.html#plugins
 * List: http://webpack.github.io/docs/list-of-plugins.html
 */
config.plugins = [
  // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
  // Only emit files when there are no errors
  new webpack.NoErrorsPlugin(),

  // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
  // Dedupe modules in the output
  // new webpack.optimize.DedupePlugin(),

  // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
  // Minify all javascript, switch loaders to minimizing mode
  new webpack.optimize.UglifyJsPlugin(),

  /* new CompressionPlugin({
    asset: '{file}.gz',
    algorithm: 'gzip',
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),*/

  // Reference: https://github.com/webpack/extract-text-webpack-plugin
  // Extract css files
  new ExtractTextPlugin('main.css'),

  new BrowserSyncPlugin({
    // browse to http://localhost:7000/ during development,
    // Proxy Express server
    proxy: 'localhost:' + (process.env.PORT || 3000),
    port: 7000
  })
]

config.resolve = {
  fallback: [__dirname + '/public/src/app'],
  root: ['node_modules']
}

module.exports = config
