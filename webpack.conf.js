// Based on https://github.com/preboot/angular-webpack

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
var CompressionPlugin = require('compression-webpack-plugin')
// var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './src/app/app.js',
  output: {
    path: __dirname + '/dist/public/js',
    publicPath: '/public/js/  ',
    filename: 'app.min.js'
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 version']
    })
  ],
  module: {
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loader: 'babel-loader',  // npm install --save-dev babel-loader
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }, {
        // CSS LOADER
        // Reference: https://github.com/webpack/css-loader
        // Allow loading css through js
        //
        // Reference: https://github.com/postcss/postcss-loader
        // Postprocess your css with PostCSS plugins
        test: /\.css$/,
        // Reference: https://github.com/webpack/extract-text-webpack-plugin
        // Extract css files in production builds
        //
        // Reference: https://github.com/webpack/style-loader
        // Use style-loader in development.
        loader: 'css?sourceMap!postcss' // npm install --save-dev css-loader postcss-loader
      }, {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3|mp4)$/,
        loader: 'file' // npm install --save-dev file-loader
      }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw' // npm install --save-dev raw-loader
      }
    ]
  },
  resolve: {
    fallback: [__dirname + '/src/app']
  },
  plugins: [
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    // Only emit files when there are no errors
    new webpack.NoErrorsPlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    // Dedupe modules in the output
    new webpack.optimize.DedupePlugin(),

    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    // Minify all javascript, switch loaders to minimizing mode
    new webpack.optimize.UglifyJsPlugin(),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    // new CopyWebpackPlugin([{
    //  from: __dirname + '/src/assets'
    // }]),

    new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
}
