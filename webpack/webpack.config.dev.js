var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './lib/index.jsx'
  },
  target: 'node-webkit',
  output: {
    filename: path.join('js', '[name].dev.js'),
    path: path.join(__dirname, 'dist'),
    publicPath: ''
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
      filename: path.join('index.html'),
      template: 'template/index.template.html'
    })
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
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url?limit=8192'
      }
    ]
  }
};
