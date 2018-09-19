import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import base from './webpack.dev';

export default merge(base, {
  devServer: {
    open: false,
    noInfo: true,
    hot: true,
    hotOnly: true,

    historyApiFallback: true
    // port: 8080
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
