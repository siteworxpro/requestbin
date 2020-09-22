/* global require */
/* global module */
/* global process */
/* global __dirname */

let path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WebpackBar = require('webpackbar')

module.exports = {
  mode: process.env.npm_lifecycle_event === 'production' ? 'production' : 'development',
  context: path.resolve(__dirname),
  devtool: process.env.npm_lifecycle_event === 'production' ? false : 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  entry: {
    app: './src/app.js'
  },
  resolve: {
    alias: {
      vue: process.env.npm_lifecycle_event === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
    }
  },
  output: {
    publicPath: "/static/js/",
    path: path.resolve(__dirname, 'requestbin/static/js'),
    filename: '[name].min.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.scss|css$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackBar()
  ]
}
