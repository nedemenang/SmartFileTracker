const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: [
    path.join(__dirname, '../client/index.jsx'),
    'webpack-hot-middleware/client'
  ],
  output: {
    path: path.resolve(__dirname, '../dist/client/public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new Dotenv({
      path: '.env',
      safe: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './client/public',
    inline: true,
    hot: true,
    port: 8080
  },
  node: {
    fs: 'empty'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader',
          'babel-loader']
      },
      {
        test: /\.(scss|css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|otf|eot|svg|ttf|woff)$/i,
        use: [
          'url-loader?limit=100000',
          'img-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
module.exports = config;
