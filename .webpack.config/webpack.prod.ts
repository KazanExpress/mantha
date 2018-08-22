import merge = require('webpack-merge');
import HtmlWebpackPlugin = require('html-webpack-plugin');

import base from './webpack.base';

export default merge(base('production'), {
  performance: {
    hints: "warning"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    })
  ]
});
