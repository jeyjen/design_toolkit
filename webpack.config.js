'use strict';

const NODE_ENV = 'development';//process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
//const rimraf = require('rimraf');

let ExtractTextPlugin = require('extract-text-webpack-plugin');

var addHash = (template, hash)=>{
  return NODE_ENV == 'production' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
};

module.exports = {
  context: path.join(__dirname),
  entry: {
    app:  ['webpack-dev-server/client?http://localhost:10000', 'webpack/hot/dev-server' ,'./app'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: addHash('[name].js', 'hash'),
    publicPath: '',
    library:  "[name]"
  },
  watch: false,//NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 100
  },
  devtool: NODE_ENV == 'development' ? "#sourcemap" : null,
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },
  module: {

    loaders: [
      /*{// очистка директории
        test: /\.js$/,
        loader: 'react-hot',
        exclude:/\/node_modules\//
      },*/

      {
        test:   /\.js$/,
        loader: 'babel',
        exclude:/\/node_modules\//,
        query:{
          presets: ["es2015","react"]
        }
      },
      {
        test:/\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!resolve-url')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader?insertAt=top', 'css-loader!resolve-url!less-loader')
      },
      {
        test:/\.(png|jpg|svg|ttf|eot|woff|woff2|gif)$/,
        loader: addHash('file?name=[path][name].[ext]', 'hash:6')
      }
    ]
  },
  plugins: [
    //{
    //  apply: (compiler) => {
    //    rimraf.sync(compiler.options.output.path);
    //  }
    //},
    new ExtractTextPlugin(addHash('[name].css', 'contenthash'), {
      allChunks: true
    }),
    //new webpack.optimize.CommonsChunkPlugin({
    //  name: "common"
    //}),
    new webpack.ProvidePlugin({
     // pluck:'lodash/collection/pluck',
      //_: 'lodash'
      $: 'jquery',
      jQuery: 'jquery',
      ReactDOM: 'react-dom',
      React: 'react'
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
      LANG:     JSON.stringify('ru')
    }),
      new AssetsPlugin({
        filename: 'assets.json',
        path: path.join(__dirname, 'public')
      }),
    new HtmlWebpackPlugin({
      title: 'TPL',
      filename: './index.html',
      template:'template.html',
      inject: 'body',
      chunks: ['app']
    }),
      new webpack.HotModuleReplacementPlugin()
  ],
  devServer:{
    host: 'localhost',
    port: 10000,
    hot: true,
    contentBase: path.join(__dirname, 'public')
  }

};

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );
}
