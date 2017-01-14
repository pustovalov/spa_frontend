const path = require('path')
const webpack = require('webpack')
const aliases = require('./aliases')

module.exports = {
  // cheap-module-source-map - for production
  // cheap-module-eval-source-map - for development
  devtool: 'cheap-module-eval-source-map',
  alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }, // https://github.com/gaearon/react-hot-loader/issues/417#issuecomment-261548082
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
     'process.env': {
       'BASE_URL': JSON.stringify('http://localhost:3000'),
       'NODE_ENV': JSON.stringify('dev')
     }
    })
  ],
  resolve: {
    root: path.resolve(__dirname, './src'),
    alias: aliases,
    extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ],
    loaders: [
      {
        loaders: ['react-hot', 'jsx?harmony'],
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.jsx$/
      },
      {
        test: /\.css$/,
        loader: "style!css" },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.json$/,
        loaders: ['json']
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
