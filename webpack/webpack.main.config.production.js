var path = require('path');
var webpack = require('webpack');
var root = process.cwd();
var packageJson = require(path.join(root, 'package.json'));

module.exports = {
  __filename: true,
  __dirname: true,
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DATABASE_NAME__: JSON.stringify(packageJson.databaseName)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
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
