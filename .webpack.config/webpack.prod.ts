import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';
import * as OptimizeCssAssetsWebpackPlugin from 'optimize-css-assets-webpack-plugin';
import * as UglifyJsWebpackPlugin from 'uglifyjs-webpack-plugin';

import base from './webpack.base';
import webpack = require('webpack');

export const productionConfig: Configuration = {
  devtool: false,

  output: {
    filename: '[name].[contenthash].js'
  },

  performance: {
    hints: 'warning'
  },

  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin({})
    ]
  },

  plugins: [
    new UglifyJsWebpackPlugin({
      cache: true,
      parallel: true,
      sourceMap: true
    }),
    new webpack.SourceMapDevToolPlugin({
      //@ts-ignore
      publicPath: 'http://localhost:8080/',
      filename: '[file].map',
      module: true
    })
  ]
};

export default merge(base('production'), productionConfig);
