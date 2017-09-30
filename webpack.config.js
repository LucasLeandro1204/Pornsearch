const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/Pornsearch.js'
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
    new UglifyJsPlugin({ comments: false })
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './lib'),
    library: 'Pornsearch',
    libraryTarget: 'umd'
  }
};
