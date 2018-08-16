const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    path: resolve('./dev-build'),
    publicPath: '/'
  },
  performance: {
    hints: "warning"
  },
  devServer: {
    open: false,
    port: 8080
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
