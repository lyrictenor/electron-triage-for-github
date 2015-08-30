var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var root = process.cwd();

module.exports = {
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
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DATABASE_NAME__: JSON.stringify(process.env.npm_package_databaseName)
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(root, 'template', 'index.template.html')
    }),
    new webpack.IgnorePlugin(/vertx/),
    new webpack.IgnorePlugin(/xmlhttprequest/),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  }
};
