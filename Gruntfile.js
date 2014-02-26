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
            afterconcat: ['dist/ubb_editor.js']
        },
        concat: {
            options: {
                stripBanners: true,
                banner: '' +
                    '/**\r\n'+
                    '  * ! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\r\n'+
                    '  * Author: luyao water2212683@gmail.com\r\n'+
                    '  * 使用方式$(\'#textarea\').ubb_editor();\r\n'+
                    '  */\r\n'
            },
            dist: {
                src: [
                    'src/intro.js',
                    'src/core.js',
                    'src/key_map.js',
                    'src/paste.js',
                    'src/ubb_to_html.js',
                    'src/html_to_ubb.js',
                    'src/outro.js',
                    'src/font.js',
                    'src/ubb_map.js',
                    'src/btn_bold.js',
                    'src/btn_color.js',
                    'src/btn_size.js',
                    'src/btn_link.js',
                    'src/btn_split.js'
                ],
                dest: 'dist/ubb_editor.js'
            }
        },
        jasmine: { 
            test: { 
                src: ['dist/ubb_editor.js'], 
                options: { 
                    specs: ['test/specs/ubb_editor_spec.js'], 
                    helpers: [''],
                    vendor: 'test/vendor/jquery1.10.2.js' 
                } 
            } 
        } 
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat','jshint']);
  grunt.registerTask('ubb_concat', ['concat']);
}