module.exports = function (config) {
	'use strict';
	config.set({

		basePath: '',

		frameworks: ['jasmine'],

		files: [
			'./public/build/*.js',
		],

		reporters: ['progress', 'coverage'],
		preprocessors: {
			'./public/build/*.js': ['coverage'],
		},

		port: 9876,
		colors: true,
		autoWatch: false,
		singleRun: false,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,
		plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage'
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
