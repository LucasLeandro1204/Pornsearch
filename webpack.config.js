const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/Pornsearch.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './lib'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin(
      {
        comments: false,
        sourceMap: true
      }
    )
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './lib'),
    library: 'Pornsearch',
    libraryTarget: 'umd'
  }
};
