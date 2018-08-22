import webpack = require('webpack');
import HtmlWebpackPlugin = require('html-webpack-plugin');
import FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
import merge = require('webpack-merge');

import base from './webpack.base';

export default merge(base('development'), {
  devtool: 'eval-source-map',

  devServer: {
    open: false,
    noInfo: true,
    hot: true,
    hotOnly: true
    // port: 8080
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
