const path = require('path')
const webpack = require('webpack')
const aliases = require('./aliases')

module.exports = {
  // cheap-module-source-map - for production
  // cheap-module-eval-source-map - for development
  devtool: 'cheap-module-eval-source-map',
  // alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' }, // https://github.com/gaearon/react-hot-loader/issues/417#issuecomment-261548082
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
     'process.env': {
       'BASE_URL': JSON.stringify('http://localhost:3000'),
       'NODE_ENV': JSON.stringify('dev')
     }
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, "src"),
      "node_modules"
    ],
    alias: aliases,
    // extensions: ['', '.js', '.jsx', '.css', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        enforce: "pre",
        loader: 'eslint-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        use: [
          'react-hot-loader'
          // ,'jsx?harmony'
        ],
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.jsx$/
      },
      {
        test: /\.css$/,
        use: [
          "style",
          "css"
        ]
      },
      {
        test: /\.scss$/,
        use: ['style', 'css', 'sass']
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
