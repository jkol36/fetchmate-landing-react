var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE,
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve:{
    root: [
      path.resolve('./src')
    ]
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader"
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            'file?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
    },
    {
      test: /\.json$/,
      loader: 'json'
    }],
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['eslint-loader'],
        include: path.join(__dirname, 'src'),
        exclude: /bundle\.js$/
      }
    ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
  stats: {
    colors: true
  }
};
