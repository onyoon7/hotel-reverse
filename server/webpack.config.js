const webpack = require('webpack');
const path = require('path');
const es2015 = require('babel-preset-es2015');


// const babel-loader = require('babel-loader');

//babel-loader : https://github.com/babel/babel-loader
module.exports = {
  devtool: 'eval-source-map',
  entry: {
    manager: './manager/index.js',
    admin : './admin/index.js'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename:   '[name].bundle.js',
  },
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
}
