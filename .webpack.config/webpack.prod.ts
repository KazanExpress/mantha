import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import base from './webpack.base';

export default merge(base('production'), {
  output: {
    filename: '[name].[contenthash].js'
  },

  performance: {
    hints: 'warning'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ]
});
