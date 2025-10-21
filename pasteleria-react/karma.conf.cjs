module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.test.jsx'
    ],
    
    preprocessors: {
      'src/**/*.test.jsx': ['vite']
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-vite')
    ],

    browsers: ['Chrome'],
    reporters: ['progress'],
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  })
}