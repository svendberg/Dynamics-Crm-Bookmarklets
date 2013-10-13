module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['src/**/*.js', 'test/**/*.js']
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'test/**/*.js'
      }
    },
    uglify: {
      options: {
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine'); 

  grunt.registerTask('default', ['jshint', 'jasmine']);
  grunt.registerTask('build', ['jshint', 'jasmine', 'uglify']);
};