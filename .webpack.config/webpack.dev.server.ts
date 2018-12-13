import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as WriteFileWebpackPlugin from 'write-file-webpack-plugin';

import base from './webpack.dev';

export const devServerConfig: webpack.Configuration = {
  devServer: {
    // Disable logs
    clientLogLevel: 'warning',

    open: false,
    noInfo: true,
    hot: true,
    hotOnly: true,

    historyApiFallback: true,

    // Open the dev server for external access
    host: '0.0.0.0'

    // Set up custom port if needed
    // port: 8080
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFileWebpackPlugin({ test: /.*(\\|\/)favicons(\\|\/).*/ })
  ]
};

export default merge(base, devServerConfig);
