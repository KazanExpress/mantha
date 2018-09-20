import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as merge from 'webpack-merge';

import base from './webpack.base';

export default merge(base('development'), {
  devtool: 'eval-source-map',

  plugins: [
    new FriendlyErrorsPlugin()
  ]
});
