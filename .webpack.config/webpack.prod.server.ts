import * as merge from 'webpack-merge';

import base from './webpack.base';
import { productionConfig as prod } from './webpack.prod';
import { developmentConfig as dev } from './webpack.dev';
import { devServerConfig as devServer } from './webpack.dev.server';

export default merge(base('production'), dev, devServer, prod, {
  output: {
    filename: '[name].[hash].js'
  }
});
