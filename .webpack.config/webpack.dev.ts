import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as merge from 'webpack-merge';

import base from './webpack.base';

export default merge(base('development'), {
  devtool: 'eval-source-map',

  devServer: {
    open: false,
    noInfo: true,
    hot: true,
    hotOnly: true,

    historyApiFallback: true
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
