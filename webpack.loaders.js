var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  babel: {
    // JS LOADER
    // Reference: https://github.com/babel/babel-loader
    // Transpile .js files using babel-loader
    // Compiles ES6 and ES7 into ES5 code
    test: /\.js$/,
    loader: 'babel-loader', // npm install --save-dev babel-loader
    exclude: /node_modules/,
    query: {
      presets: ['es2015'] // <--- NOT ENOUGH!!! https://github.com/babel/babel-loader/issues/162
    }
  },
  css: {
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
    loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss') // npm install --save-dev css-loader postcss-loader
  },
  file: {
    // ASSET LOADER
    // Reference: https://github.com/webpack/file-loader
    // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
    // Rename the file using the asset hash
    // Pass along the updated reference to your code
    // You can add here any file extension you want to get copied to your output
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|mp3|mp4)$/,
    loader: 'file' // npm install --save-dev file-loader
  },
  html: {
    // HTML LOADER
    // Reference: https://github.com/webpack/raw-loader
    // Allow loading html through js
    test: /\.html$/,
    loader: 'raw' // npm install --save-dev raw-loader
  }
}
