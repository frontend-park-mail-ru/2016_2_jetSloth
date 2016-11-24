'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/public',
    entry: ['./main.js'],
    output: {
        path: __dirname + '/public/build',
        filename: 'app.js'
    },
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.pug$/,
            loader: 'pug-loader'
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style", "css")
        }]
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {
            allChunks: true
        }),
        new webpack.NoErrorsPlugin(),
    ]
};
