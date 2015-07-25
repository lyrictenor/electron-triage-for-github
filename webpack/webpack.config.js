var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var root = process.cwd();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(root, 'lib', 'main.js')
    ]
  },
  output: {
    filename: path.join('js', '[name].js'),
    path: path.join(root, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'template', 'index.template.html')
    }),
    new webpack.ExternalsPlugin('remote', 'icp', 'browser-window', 'app')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      }
    ]
  }
};
