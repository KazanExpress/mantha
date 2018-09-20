import { join } from 'path';
import { Configuration } from 'webpack';
import * as cleanWebpackPlugin from 'clean-webpack-plugin';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin/lib';
import * as webpack from 'webpack';

function resolve(dir: string) {
  return join(__dirname, '..', dir);
}

// tslint:disable-next-line:no-var-requires
var paths = require('../src/tsconfig.json').compilerOptions.paths;

paths = Object.keys(paths).reduce((obj, key) => {
  obj[key.replace('/*', '')] = resolve('./src/' + paths[key][0].replace('/*', '').replace('./', ''));

  return obj;
}, {});

export default (mode: 'development' | 'production'): Configuration => ({
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
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: [/.*src\/themes\/.*/]
      },
      {
        test: /\.less$/,
        use: [
          // TODO: make file-loader work with 'style-loader/url'
          // 'file-loader',
          'style-loader', 'css-loader', 'less-loader'],
        include: [/.*src\/themes\/.*/]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: { minimize: true }
      },
      {
        test: [/\.d\.ts$/, /tsconfig\.json/],
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
        test: /\.(woff(2)?|eot|ttf|otf|png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
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
      chunks: 'async',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all'
        },
        theme: {
          test: /themes/,
          name: 'theme',
          chunks: 'all'
        }
      }
    }
  },

  parallelism: 8,

  plugins: [
    new cleanWebpackPlugin(resolve('./build/' + mode), {
      allowExternal: true
    }),
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.ENV': JSON.stringify(mode),
    })
  ]
});
