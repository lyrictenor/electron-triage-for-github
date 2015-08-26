var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var root = process.cwd();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    application: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.join(root, 'lib', 'application.js')
    ]
  },
  output: {
    filename: path.join('[name].js'),
    path: path.join(root, 'dist'),
    publicPath: ''
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'template', 'index.template.html')
    }),
    new webpack.ExternalsPlugin('remote')
  ],
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
