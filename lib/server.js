var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('../webpack/webpack.application.config.js');
var root = process.cwd();
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  contentBase: path.join(root, 'dist'),
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, 'localhost', function(err) {
  if (err) {
    console.log(err);// eslint-disable-line no-console
    return;
  }

  console.log('Listening at http://localhost:3000');// eslint-disable-line no-console
});
