import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as merge from 'webpack-merge';

import base from './webpack.base';

export default merge(base('development'), {
  devtool: 'eval-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      // filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
});
