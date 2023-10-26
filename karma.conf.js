module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/*/.spec.ts'
    ],
    preprocessors: {
      'src/*/.spec.ts': ['webpack']
    },
    browsers: ['Chrome'],
    webpack: {
      // Configuración de Webpack si es necesario
    },
    reporters: ['progress'],
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity
  });
};