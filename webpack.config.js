var path = require('path');
var webpack = require('webpack');
// Compiler automatically opens the browser
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// html template
var HtmlWebpackPlugin = require("html-webpack-plugin");
// CSS
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var node_modules = path.resolve(__dirname, 'node_modules');

/**
 *  Identify the development environment and the production environment
 * @type {webpack.DefinePlugin}
 */
var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
});

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './build',
    port: 8080,
    stats: { colors: true },
    host: '0.0.0.0'
  },
  entry: {
    index: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/index.js')
    ],
    vendor: ['react', 'react-dom']
  },
  output: {
      path: path.resolve(__dirname, 'build'),
      filename: "[name].js",
      publicPath: '/'
  },
  resolve: {
    extension: ['', '.jsx', '.js', '.json'],
    // Improve webpack search speed
    alias: { }
  },
  devtool: 'source-map',
  'display-error-details': true,
  externals: [],
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new HtmlWebpackPlugin({
      title: 'your app title',
      template: './app/index.html',
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080',
      browser: 'Google Chrome'
    }),
    new ExtractTextPlugin("main.css", {
      allChunks: true,
      disable: false
    }),
  ]
};
