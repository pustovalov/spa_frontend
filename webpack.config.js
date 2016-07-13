var path = require('path')
var webpack = require('webpack')


module.exports = {
  // cheap-module-source-map - for production
  // cheap-module-eval-source-map - for development
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
    publicPath: '/public'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // remove for production
    new webpack.NoErrorsPlugin()
    // Minifies/uglifies your code for production
    // new webpack.optimize.UglifyJsPlugin(),
    // Tells webpack to omit some things it uses for node environment builds
    // new webpack.DefinePlugin({
    //  'process.env': {
    //    'NODE_ENV': JSON.stringify('production')
    //  }
    // })
  ],
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
        loaders: ['react-hot', 'jsx?harmony'], // remove react-hot for production
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.jsx$/
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
