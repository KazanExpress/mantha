import path = require('path');
import { Configuration } from 'webpack';

function resolve(dir: string) {
  return path.join(__dirname, '..', dir);
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
        loader: 'ts-loader'
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

  parallelism: 8
});
