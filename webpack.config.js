const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/Pornsearch.js'
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  target: 'node',

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
  //  new UglifyJsPlugin({ comments: false })
  ],

  output: {
    filename: 'pornsearch.min.js',
    path: path.resolve(__dirname, './dist'),
    library: 'Pornsearch',
    libraryTarget: 'umd'
  }
};
