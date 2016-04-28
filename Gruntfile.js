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
            v1: {
                src: [
                    'src/js/v1/main.js',
                    'src/js/v1/*.js'
                ],
                dest: 'dist/<%= pkg.name %>.v1.<%= pkg.version %>.js'
            },
            v2: {
                src: ['cache/js/<%= pkg.name %>.v2.js'],
                dest: 'dist/<%= pkg.name %>.v2.<%= pkg.version %>.js'
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
                    'dist/<%= pkg.name %>.v1.<%= pkg.version %>.min.js': ['<%= concat.v1.dest %>'],
                    'dist/<%= pkg.name %>.v2.<%= pkg.version %>.min.js': ['<%= concat.v2.dest %>']
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
        browserify: {
            dist: {
                files: {
                    'cache/js/<%= pkg.name %>.v2.js': ['src/js/v2/core.jnet.js']
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
            tasks: ['browserify', 'jshint', 'concat', 'uglify', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-browserify');
    
    // this would be run by typing "grunt test" on the command line
    grunt.registerTask('test', ['jshint', 'qunit']);

    // the default task can be run just by typing "grunt" on the command line
    grunt.registerTask('default', ['watch']);

};