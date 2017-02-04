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
            app: './index.js',
			vendor: libs
        },
		resolve: 
		{
			modules: 
			[
				path.join(__dirname, "dist"),
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
						loader: "css-loader",
						publicPath: "/dist"
					})
				},
				{
					test:/\.(png|jpg|svg|ttf|eot|woff|woff2|gif)$/,
					loader: 'file-loader?name=[path][name]-[hash:7].[ext]'
				}
				
			]
		},
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist'),
			publicPath: '/'
        },
		context: __dirname,
        plugins: 
		[
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor'] // manifest - указывает на необходимость сборки всех перечисленных библиотек в единный файл				
            }),
			new ExtractTextPlugin({
    			filename: "[contenthash]bundle.css",
    			disable: false,
    			allChunks: true
  			}),
			
			new HtmlWebpackPlugin({
				title: pack.name,
				filename: './index.html',
				template:'template.html',
				inject: 'body',
			chunks: ['vendor','app'],}),

			new webpack.NamedModulesPlugin()
			// prints more readable module names in the browser console on HMR updates
        ]
    };
}