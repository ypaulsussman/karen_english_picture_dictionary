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
      angularAnimate: {
        expand: true,
        cwd: 'node_modules/angular-animate/',
        src: ['angular-animate.js',
              'angular-animate.min.js',
              'angular-animate.min.js.map'],
        dest: 'server/public/vendors/angular-animate/'
      },
      angularAria: {
        expand: true,
        cwd: 'node_modules/angular-aria/',
        src: ['angular-aria.js',
              'angular-aria.min.js',
              'angular-aria.min.js.map'],
        dest: 'server/public/vendors/angular-aria/'
      },
      angularMaterial: {
        expand: true,
        cwd: 'node_modules/angular-material/',
        src: ['angular-material.css',
              'angular-material.js',
              'angular-material.min.js',
              'angular-material.min.js.map'],
        dest: 'server/public/vendors/angular-material/'
      },
      angularMaterialDataTable: {
        expand: true,
        cwd: 'node_modules/angular-material-data-table/',
        src: ['md-data-table.min.css',
              'md-data-table.min.js'],
        dest: 'server/public/vendors/angular-material-data-table/'
      },
      angularMessages: {
        expand: true,
        cwd: 'node_modules/angular-messages/',
        src: ['angular-messages.js',
              'angular-messages.min.js',
              'angular-messages.min.js.map'],
        dest: 'server/public/vendors/angular-messages/'
      },
      // you'll need to write copy configs for
      // angular-animate, angular-aria, angular-material, angular-material-data-table, angular-messages
      // before you begin to use angular materials

    },
    watch: {
      files : ['client/**/*.*', 'client/**/**/*.*', 'client/**/**/**/*.*'],
      tasks : ['copy'],
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['copy', 'watch']);
};
