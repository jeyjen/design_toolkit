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

var extract_css = new ExtractTextPlugin('style/[name].css');


module.exports = function() {	
	
	return {
        entry: {
            app: './index.js',
			vendor: libs
        },
        output: {
            filename: '[hash:5].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest'] // manifest - указывает на необходимость сборки всех перечисленных библиотек в единный файл				
            })
        ]
    };
}