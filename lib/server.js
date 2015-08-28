var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack/webpack.application.config.js');
var root = process.cwd();
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

new WebpackDevServer(webpack(config), {
  contentBase: path.join(root, 'dist'),
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  hot: true,
  stats: {
    colors: true
  }
}).listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);// eslint-disable-line no-console
    return;
  }
  console.log('Listening at localhost:3000');// eslint-disable-line no-console
});
