var webpack = require('webpack');
var path = require('path');

module.exports = function() {
    return {
        entry: {
            app: './app.js',
			vendor: ['moment', 'uuid']
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: ['vendor', 'manifest']				
            })
        ]
    };
}