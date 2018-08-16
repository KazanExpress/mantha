var path = require('path')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  resolve: {
    extensions: ['.js', '.pug', '.less', '.json'],
    alias: {
      '@': resolve('/src/'),
      'views': resolve('./src/views'),
      'components': resolve('./src/components'),
      'pages': resolve('./src/pages'),
      'themes': resolve('./src/themes'),
      'plugins': resolve('./src/plugins'),

      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
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
        test: /\.js?$/,
        exclude: [/node_modules/],
        loader: 'babel-loader'
      },
      {
        test: /\.pug$/,
        loaders: [{
          loader: 'apply-loader'
        }, {
          loader: 'pug-loader',
          options: { pretty: true }
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
  }
};
