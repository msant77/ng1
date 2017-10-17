// Karma configuration
// Generated on Fri Sep 08 2017 14:09:34 GMT-0300 (BRT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-babel-preprocessor',
      'karma-coverage'
    ],
    
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/**/*.js': ['babel', 'coverage']
    },

    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    // list of files / patterns to load in the browser
    files: [
    	'js/src/angular/angular.min.js',
	    'js/src/angular-resource/angular-resource.min.js',
	    'js/src/angular-ui-router/release/angular-ui-router.min.js',
	    'js/src/angular-sanitize/angular-sanitize.min.js',
	    'js/src/ngstorage/ngStorage.min.js',
	    'js/src/angular-messages/angular-messages.min.js',
	    'js/src/angular-aria/angular-aria.min.js',
	    'js/src/angular-animate/angular-animate.min.js',
	    'js/src/angular-material/angular-material.min.js',
      'js/src/firebase/firebase.js',
	    'js/src/angularfire/dist/angularfire.min.js',

      // dev modules in node_modules
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/karma-read-json/karma-read-json.js',

      // modules first
      // app.core dependencies
      'app/core/app.core.module.js',
      // 'app/core/shell/core.shell.module.js',
      'app/core/start/core.start.module.js',
      'app/biz/services/biz.services.module.js',

      'app/core/login/login.service.js',
      // 'app/core/start/core.start.module.js',
      
      // 'app/core/shell/core.shell.module.js',
      // 'app/biz/app.biz.module.js',
      'app/biz/services/biz.services.module.js',
      'app/biz/cliente/cliente.module.js',
      // 'app/biz/user/user.module.js',
      
      'app/**/*.js',
      'app/**/*.spec.js',

      {pattern: './**/*.json', included:  false}
    ],


    // list of files to exclude
    exclude: [
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    //  available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun:   false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    proxies: {
      '/app/core/start/settings.json':'http://localhost:9876/app/core/start/settings.json'
    }
  })
}
