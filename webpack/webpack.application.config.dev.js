var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var root = process.cwd();

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: {
    application: path.join(root, 'lib', 'application.js')
  },
  target: 'atom',
  output: {
    filename: path.join('[name].js'),
    path: path.join(root, 'dist'),
    publicPath: ''
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'template', 'index.template.html')
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/xmlhttprequest/)
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
        loaders: ['babel'],
        exclude: [/node_modules/]
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
