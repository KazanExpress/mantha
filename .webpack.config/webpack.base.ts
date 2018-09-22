import { join } from 'path';
import { existsSync } from 'fs';
import { Configuration } from 'webpack';
import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin/lib';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import * as webpack from 'webpack';

import htmlConfigFactory from '../src/.config/html';

function resolve(dir: string) {
  return join(__dirname, '..', dir);
}

// tslint:disable-next-line:no-var-requires
var paths = require('../src/tsconfig.json').compilerOptions.paths;

paths = Object.keys(paths).reduce((obj, key) => {
  obj[key.replace('/*', '')] = resolve('./src/' + paths[key][0].replace('/*', '').replace('./', ''));

  return obj;
}, {});

export default (mode: 'development' | 'production'): Configuration => {
  const htmlConfig = htmlConfigFactory(mode);
  htmlConfig.favicon && (htmlConfig.favicon = resolve('./src/' + htmlConfig.favicon));

  const iconsExist = existsSync(resolve('./build/favicons'));

  return ({
    mode,
    output: {
      path: resolve('./build/' + mode),
      publicPath: '/'
    },
    stats: {
      performance: true,
      modules: false,
      colors: true,

      env: true,
      excludeAssets(name) {
        return name.includes('favicon') || name.includes('webpack-silent');
      }
    },

    resolve: {
      extensions: ['.ts', '.js', '.pug', '.less', '.json'],
      alias: {
        ...paths,

        'vue$': 'vue/dist/vue.runtime.esm.js'
      }
    },

    module: {
      noParse: /.*tsconfig\.json$/,
      rules: [
        {
          test: /\.(le|c)ss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
          exclude: [/.*src\/themes\/.*/]
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            // TODO: make file-loader work with 'style-loader/url'
            // 'file-loader',
            'style-loader', 'css-loader', 'postcss-loader', 'less-loader'
          ],
          include: [/.*src\/themes\/.*/]
        },
        {
          test: /\.html$/,
          loaders: [
            {
              loader: 'vue-template-loader',
              options: {
                functional: false
              }
            },
            'html-loader'
          ],
        },
        {
          test: [/\.d\.ts$/, /tsconfig\.json/, /html\.ts/],
          loader: 'ignore-loader'
        },
        {
          test: /\.ts$/,
          exclude: [/(node_modules)|(\.d\.ts)/],
          loader: 'ts-loader',
          options: {
            configFile: resolve('./src/tsconfig.json'),
            transpileOnly: true
          }
        },
        {
          test: /\.js?$/,
          exclude: [/node_modules/],
          loader: 'babel-loader'
        },
        {
          test: /\.pug$/,
          loaders: [{
            loader: 'vue-template-loader',
            options: {
              functional: false
            }
          }, {
            loader: 'pug-plain-loader'
          }]
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('./build/' + mode + '/fonts/[name].[ext]')
          }
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('./build/' + mode + '/img/[name].[ext]')
          }
        }
      ]
    },

    optimization: {
      mergeDuplicateChunks: true,
      flagIncludedChunks: true,
      removeAvailableModules: true,
      removeEmptyChunks: true,
      runtimeChunk: {
        name: 'async-importer'
      },
      splitChunks: {
        maxInitialRequests: 20,
        maxAsyncRequests: 20,
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true
          },
          main: {
            test: /.*src(\/|\\)(pages|components)(\/|\\).*/,
            chunks: 'all',
            enforce: true,
            reuseExistingChunk: true,
            name: true
          }
        }
      }
    },

    parallelism: 8,

    plugins: [
      new HtmlWebpackPlugin({
        template: require('html-webpack-template'),
        inject: false,
        env: { NODE_ENV: mode, ENV: mode },
        ...htmlConfig,
        minify: mode === 'production' ? {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          minifyCSS: true,
          minifyJS: true
        } : false
      }),
      new cleanWebpackPlugin(resolve('./build/' + mode), {
        allowExternal: true
      }),
      new ForkTsCheckerWebpackPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.ENV': JSON.stringify(mode),
      }),
      new webpack.NamedModulesPlugin(),
      // TODO
      htmlConfig.favicon ? new FaviconsWebpackPlugin({
        title: htmlConfig.title,
        logo: htmlConfig.favicon,
        prefix: '../favicons/',
        inject: true,
        persistentCache: true,

        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: true,
          favicons: true,
          firefox: true,
          opengraph: true,
          twitter: true,
          yandex: true,
          windows: true
        }
      }) : { apply() {} },
      new CopyWebpackPlugin([
        {
          from: './build/favicons/*',
          to: './favicons/[name].[ext]',
          toType: 'template'
        }, {
          from: './src/assets/*',
          to: './assets/[name].[ext]',
          toType: 'template'
        }
      ])
    ]
  });
};
