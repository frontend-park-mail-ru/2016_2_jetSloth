let webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
    'use strict';
    config.set({

        basePath: '',


        frameworks: ['jasmine'],


        files: [
            // './public/build/*.js',
            './test/**/*.spec.js'
        ],

        reporters: ['progress', 'coverage'],
        preprocessors: {
            './test/**/*.spec.js': ['webpack'],
            // './public/build/*.js': ['coverage']
        },

        port: 9876,
        colors: true,
        autoWatch: false,
        singleRun: false,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },

        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-webpack'
        ],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        browsers: ['Chrome'],
        coverageReporter: {
            type: 'html',
            dir: 'public/coverage/'
        }
    });
};
