'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

// упаковка сторонних библиотек в единный файл
var contents = fs.readFileSync('./package.json', 'utf8');
var pack = JSON.parse(contents);
var libs = [];
for (var prop in pack.dependencies) 
{
    libs.push(prop);
}

module.exports = function() {	
	
	return {
        entry: {
            app: ['react-hot-loader/patch', 'webpack-dev-server/client?http://localhost:10001', 'webpack/hot/only-dev-server', './index.js'],
			lib: libs
        },
		resolve: 
		{
			modules: 
			[
				__dirname,
				"node_modules"
			]
		},
		module:
		{
			rules: 
			[
				{
					test: /\.js$/,
					use: [
					  'babel-loader',
					],
					exclude: /node_modules/
				},
				{
					test: /.css$/,
					loader: ExtractTextPlugin.extract({
						fallbackLoader: "style-loader",
						loader: "css-loader"//,
						//publicPath: "/"
					})
				},
				{
					test:/\.(png|jpg|svg|ttf|eot|woff|woff2|gif)$/,
					loader: 'file-loader?name=[path][name].[ext]?hash=[hash:7]'
				}
				
			]
		},
        output: {
            filename: '[name].js?hash=[hash:7]',
            path: path.resolve(__dirname, 'dist')//,
			//publicPath: '/'
        },
		context: __dirname,
		devtool: 'inline-source-map',
		devServer: 
		{
			hot: true,
			// enable HMR on the server

			contentBase: path.resolve(__dirname, 'dist'),
			// match the output path

			publicPath: '/',
			// match the output `publicPath`,
			port:10000
		},
        plugins: 
		[
            new webpack.optimize.CommonsChunkPlugin({
                names: ['lib', 'manifest'] // manifest - указывает на необходимость сборки всех перечисленных библиотек в единный файл				
            }),
			new ExtractTextPlugin({
    			filename: "bundle.css?hash=[contenthash]",
    			disable: false,
    			allChunks: true
  			}),
			
			new HtmlWebpackPlugin({
				title: pack.name,
				filename: './index.html',
				template:'template.html',
				inject: 'body',
			chunks: ['manifest','lib','app'],}),
			new webpack.HotModuleReplacementPlugin(),
			// enable HMR globally

			new webpack.NamedModulesPlugin()
			// prints more readable module names in the browser console on HMR updates
        ]
    };
}