var path = require('path')
var webpack = require('webpack')


module.exports = {
    entry: [
      'webpack-hot-middleware/client',
      './src/entry.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js",
        publicPath: '/public'
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loaders: [
                "react-hot",
                "eslint-loader",
                "jsx?harmony"
              ],
              exclude: /node_modules/
            },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-runtime']
              }
            }
        ],
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
};
