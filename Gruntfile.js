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
                    'src/core/intro.js',
                    'src/core/core.js',
                    'src/core/key_map.js',
                    'src/core/paste.js',
                    'src/core/ubb_to_html.js',
                    'src/core/html_parser.js',
                    'src/core/iframe.js',
                    'src/core/html_to_ubb.js',
                    'src/core/outro.js',
                    'src/toolbar/btn_bold.js',
                    'src/lib/rgb_to_hex.js',
                    'src/toolbar/btn_color.js',
                    'src/toolbar/btn_size.js',
                    'src/toolbar/btn_link.js',
                    'src/toolbar/btn_split.js'
                ],
                dest: 'dist/ubb_editor.js'
            }
        }
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat','jshint']);
  grunt.registerTask('ubb_concat', ['concat']);
}