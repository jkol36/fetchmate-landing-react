var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  inline:true,
  hot:true,
  stats: {
    chunkModules: false,
    colors: true
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/app.html'));
});

app.listen(8000, '0.0.0.0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
