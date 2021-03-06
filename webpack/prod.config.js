const path = require('path');
const webpack = require('webpack');
const customPath = path.join(__dirname, './customPublicPath');

module.exports = {
  entry: {
    todoapp: [customPath, path.join(__dirname, '../chrome/extension/todoapp')],
    background: [customPath, path.join(__dirname, '../chrome/extension/background')],
  },
  output: {
    path: path.join(__dirname, '../build/js'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/[^/]+\/[\S]+.dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compressor: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json'], 
    modulesDirectories: [
        'node_modules',
        path.resolve(__dirname, './node_modules')                                                                                                                               
    ]
  },
  module: {
    loaders: [
      {test: /\.json/, loader: "json"},
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }, 
      /*{
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      }*/
      {
        test: /(\.scss|\.css)$/,       
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass'
        ]
        
      }]
  }
};
