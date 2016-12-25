const path = require('path')
const webpack = require('webpack')
const aliases = require('./aliases')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    // Tells webpack to omit some things it uses for node environment builds
    new webpack.DefinePlugin({
     'process.env': {
       'BASE_URL': JSON.stringify('http://spa_backend.pustovalov.net'),
       'NODE_ENV': JSON.stringify('production')
     }
    })
  ],
  resolve: {
    root: path.resolve(__dirname, './src'),
    alias: aliases,
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    loaders: [
      {
        loaders: ['jsx?harmony'],
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.jsx$/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react', 'stage-3'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
