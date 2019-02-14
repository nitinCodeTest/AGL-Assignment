const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.(css)$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /.*\.(png|jpe?g)$/i,
      use: 'file-loader'
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    host: process.env.DEV_SERVER_HOST || 'localhost',
    port: process.env.DEV_SERVER_PORT || 3000
  }
};

module.exports = config;
