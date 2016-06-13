var webpack = require('webpack')
var path = require('path')
var HtmlwebpackPlugin = require('html-webpack-plugin')
var ROOT_PATH = path.resolve(__dirname)

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(ROOT_PATH, 'src/index.js')
  ],
  output: {
    path: './build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'build'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, 'universal')
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'sass'
        ],
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlwebpackPlugin({
      title: 'Universal App',
      template: path.resolve(ROOT_PATH, 'static/index.html')
    })
  ]
}
