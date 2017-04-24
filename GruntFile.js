module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      assets: {
        expand: true,
        cwd: 'client/assets',
        src: ['**/*.js', '**/**/*.js', '**/*.css'],
        dest: 'server/public/assets/'
      },
      views: {
        expand: true,
        cwd: 'client/views',
        src: ['*.html', '**/*.html'],
        dest: 'server/public/views/'
      },
      angular: {
        expand: true,
        cwd: 'node_modules/angular/',
        src: ['angular.js',
              'angular.min.js',
              'angular.min.js.map'],
        dest: 'server/public/vendors/angular/'
      },
      angularRoute: {
        expand: true,
        cwd: 'node_modules/angular-route/',
        src: ['angular-route.js',
              'angular-route.min.js',
              'angular-route.min.js.map'],
        dest: 'server/public/vendors/angular-route/'
      },

      // you'll need to write copy configs for
      // angular-animate, angular-aria, angular-material, angular-material-data-table, angular-messages
      // before you begin to use angular materials

      //*NOTE: next step is livereload
    },
    watch: {
      files : ['client/**/*.*', 'client/**/**/*.*'],
      tasks : ['copy'],
      options: { livereload: true },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
