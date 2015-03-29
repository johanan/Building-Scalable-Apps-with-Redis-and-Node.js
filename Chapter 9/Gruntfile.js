module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    git_head: process.env.GIT_HEAD,
    nodeunit: {
      all: ['tests/*.js']
    },
    preprocess: {
      dist: {
        files: {
          'views/chat.ejs' : 'views/chat.pre',
          'views/layout.ejs' : 'views/layout.pre',
          'js_src/src/chat.js' : 'js_src/src/chat.pre.js'
        }
      }
    },
    clean:{
      dist:{
        src: ['static/js/*.js']
      }
    },
    jshint: {
      dist:{
        src: ['js_src/src/*.js', '!js_src/src/md5.js']
      }
    },
    concat:{
      app: {
        src: ['js_src/src/md5.js', 'js_src/src/components.js', 'js_src/src/models.js', 'js_src/src/chat.js'],
        dest: 'static/js/ChatPage.js'
      },
      frameworks: {
        src: ['bower_components/jquery/dist/jquery.js', 'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js', 'bower_components/react/react.js',
          'bower_components/lodash/dist/lodash.js', 'bower_components/conduitjs/lib/conduit.js',
          'bower_components/postal.js/lib/postal.js', 'bower_components/momentjs/moment.js'],
        dest: 'static/js/Frameworks.js'
      }
    },
    uglify: {
      dist: {
        files: {
          'static/js/ChatPage.<%= git_head %>.min.js' : '<%= concat.app.dest %>',
          'static/js/Frameworks.<%= git_head %>.min.js' : '<%= concat.frameworks.dest %>'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Default task(s).
  grunt.registerTask('default', ['nodeunit', 'preprocess', 'clean', 'jshint', 'concat:app', 'concat:frameworks', 'uglify']);
  grunt.registerTask('prep', ['nodeunit', 'preprocess']);
};
