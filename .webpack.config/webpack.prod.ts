import * as merge from 'webpack-merge';

import base from './webpack.base';

export default merge(base('production'), {
  output: {
    filename: '[name].[contenthash].js'
  },

  performance: {
    hints: 'warning'
  },
});
