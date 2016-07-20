module.exports = function(grunt){
  grunt.initConfig({
      jshint: {
        files: [ "*.js", "app/**/*.js", "public/js/*.js",  "config/**/*.js","test/**/*.js" ],
        options: {
          esnext: true,
          globals: {
            jQuery: true 
          }
        }
      },
      sass: {
        dist: {
          files: {
            'public/css/app.css' : 'public/css/application.scss'
          }
        }
      },
      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['css']
        },
        scripts:{
          files: [ "*.js", "app/**/*.js", "public/js/*.js",  "config/**/*.js","test/**/*.js" ],
          tasks: ['jshint']
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('css', ['sass']);
  grunt.registerTask("default", ["jshint", "css"]);
};
