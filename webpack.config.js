var webpack = require('webpack');


module.exports = {
    entry: "./src/entry.jsx",
    output: {
        path: __dirname + "/build",
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
              test: /\.jsx?$/,
              loaders: [
                "react-hot",
                "eslint-loader",
                "jsx"
              ],
              exclude: /node_modules/
            },
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query: {
                presets: ['es2015', 'react']
              }
            }
        ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
};
