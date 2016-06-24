var webpack = require('webpack');
var path = require('path');
var es2015 = require('babel-preset-es2015');

module.exports = {
  devtool: 'eval-source-map',
  entry: {
//    manager: './manager/index.js',
    admin : './admin/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename:   '[name].bundle.js',
  },
  watch: true,
  module : {
    loaders : [
      {
        test : /\.jsx?$/,
        exclude : /(node_modules|bower_components)/,
        loader : 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          cacheDirectory: true,
          presets: ['es2015'],
        }
      }
    ]
  }
};
