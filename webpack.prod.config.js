'use strict';

var path = require('path');
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// html template
var HtmlWebpackPlugin = require("html-webpack-plugin");
// css
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/index.js')
  ],
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: "[name].[hash:8].js",
      publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    alias: {}
  },
  'display-error-details': true,
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loaders: ['react-hot', 'babel'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
       test: /\.scss/,
       loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192'
      },
      {
        test: /\.(woff|woff2|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("main.[hash:8].css", {
        allChunks: true,
        disable: false
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash:8].js'),
    new uglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './app/index.html',
    }),
    new webpack.optimize.MinChunkSizePlugin({
      compress: {
        warnings: false
      }
    }),
    // Avoid duplication of modules in the resulting file
    new webpack.optimize.DedupePlugin(),
    // Sort ID by reference frequency to achieve the effect of reducing file size
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin({
			minSizeReduce: 1.5,
			moveToParents: true
    }),
  ]
};
