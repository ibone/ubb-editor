module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
              curly: true,
              eqeqeq: true,
              eqnull: true,
              browser: true,
              globals: {
                jQuery: true
              }
            },
            beforeconcat: ['src/*.js'],
            afterconcat: ['dist/ubb_editor.js']
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            dist: {
                src: ['ubb-editor/src/font.js','ubb-editor/src/paste.js'],
                dest: 'dist/ubb_editor.js'
            }
        }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('ubb_concat', ['concat']);
}