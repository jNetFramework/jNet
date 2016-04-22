module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: '/**\n' +
                ' * @author <%= pkg.author %> \n' +
                ' * @email <<%= pkg.email %>> \n' +
                ' * @project <%= pkg.project %> \n' +
                ' * @version <%= pkg.version %> \n' +
                ' * @date <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                ' **/\n',
                separator: '\n'
            },
            dist: {
                src: [
                    'src/js/main.js',
                    'src/**/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.project %> <%= pkg.version %> ' +
                '[<%= pkg.author %>, <<%= pkg.email %>>] ' +
                '<%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                metadata: '',
                regExp: false
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'concat', 'uglify', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');

    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['watch']);

};