import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import * as merge from 'webpack-merge';

import base from './webpack.base';
import { Configuration } from 'webpack';

export const developmentConfig: Configuration = {
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new FriendlyErrorsPlugin()
  ]
};

export default merge(base('development'), developmentConfig);
