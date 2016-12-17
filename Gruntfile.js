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
      my_target: {
        files: {
          'build/maileditor_ckeditor.js': ['src/maileditor_ckeditor.js'],
          'build/entityfinder.js': ['src/entityfinder.js'],
          'build/entityinfo.js': ['src/entityinfo.js']
        }
    }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('build', ['jshint', 'uglify']);
};