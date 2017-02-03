'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[chunkhash].[name].js',
            path: path.resolve(__dirname, 'dist')
        }
    }
}
