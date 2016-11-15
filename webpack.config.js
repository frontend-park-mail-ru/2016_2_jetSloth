'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/public',
    entry: {
        'main': ['./main.js'],
        'signin': ['./views/signin.js'],
        'signup': ['./views/signup'],
        'welcome': ['./views/main.js']
    },
    output: {
        path: __dirname + '/public/build',
        filename: '[name].js'
    },
    watch: true,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css!sass")
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("style.css",  {allChunks: true}),
        new webpack.NoErrorsPlugin()
    ]
};
