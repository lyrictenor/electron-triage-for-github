var path = require('path');
var webpack = require('webpack');
var root = process.cwd();

module.exports = {
  __filename: true,
  __dirname: true,
  devtool: 'cheap-module-eval-source-map',
  debug: true,
  entry: {
    main: path.join(root, 'lib', 'main.js')
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
        'NODE_ENV': JSON.stringify('development')
      },
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __DATABASE_NAME__: JSON.stringify(process.env.npm_package_databaseName)
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
        test: /\.js$/,
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
