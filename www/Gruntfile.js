/**
 * Created by zhongyw on 2016/3/14.
 */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        config: {
            dist: './static',
            src: './src'
        },
        clean: ['<%= config.dist %>/css/target/**/*.css', '<%= config.dist %>/css/target/**/*.map'],
        concat:{
            sample: {
                options: {
                    banner: '/* <%= pkg.name %> */\n',
                },
                src: ['<%= config.dist %>/js/**/*.js'],
                dest: 'js/main-o.js',
            },
            css: {
                options: {
                    banner: '/* <%= pkg.name %> */\n',
                },
                //src: ['<%= config.src %>/css/base.css','<%= config.dist %>/css/top.css', '<%= config.dist %>/css/icon.css', '<%= config.dist %>/css/sidebar.css', '<%= config.dist %>/css/body.css'],
                src: ['<%= config.src %>/css/main.css'],
                dest: '<%= config.dist %>/css/main2.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= config.dist %>/js/main-o.js',
                dest: '<%= config.dist %>/js/main-o-min.js'
            },

        },
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dist %>/css',
                        src: ['main.css'],
                        dest: '<%= config.dist %>/css/min'
                    }
                ]
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    angular: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            foo: {
                src: ['<%= config.src %>/js/**/*.js'],
                filter: function(filepath) {
                    return (filepath.indexOf("main-o") == -1);
                }
            },
        },
        sass: {
            dev: {
                //files: [{
                expand: true,
                cwd: "<%= config.src %>/scss/",
                src: '**/*.scss',
                dest:'<%= config.dist %>/css/',
                ext: ".css"
                //}]
            }
        },
        less: {
            compileCore: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>.css.map',
                    sourceMapFilename: 'css/<%= pkg.name %>.css.map'
                },
                src: 'src/less/bootstrap.less',
                dest: '<%= config.dist %>/css/<%= pkg.name %>.css'
            },
            compileTheme: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: '<%= pkg.name %>-theme.css.map',
                    sourceMapFilename: 'css/<%= pkg.name %>-theme.css.map'
                },
                src: 'src/less/theme.less',
                dest: 'css/<%= pkg.name %>-theme.css'
            }
        },
        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 versions']
                },
                expand: true,
                cwd: 'css/', /*只针对 src发生*/
                src: '**/*.css',
                dest: 'css/',
                ext: '.css' /* dest的后缀， 可以是.min.css之类 */
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['build']
            },
            js: {
                files: ['<%= config.dist %>/js/**/*.js','test/**/*.js'],
                //tasks: ['karma:unit:run', 'build'],
                tasks: ['karma:unit:run']

            },
            scss: {
                files: '<%= config.src %>/scss/**/*.scss',
                tasks: ['sass', 'autoprefixer', 'concat:css']
            },
            less: {
                files: '<%= config.src %>/less/**/*.less',
                tasks: ['less', 'autoprefixer']
            },
            index: {
                files: '<%= config.src %>/index.html',
                tasks: ['build']
            }
        },
        connect: {
            server: {
                options: {
                    port: 18021,
                    //hostname: '10.1.2.43',
                    hostname: '127.0.0.1',
                    base: './app',
                    open: {
                        //target: 'http://10.1.2.43:18021/', // target url to open, 目标路径
                        target: 'http://127.0.0.1:18021/',
                        appName: 'chrome', // name of the app that opens, ie: open, start, xdg-open，自动启动的应用名称, 比如你的浏览器：chrome
                        callback: function() {} // called when the app has opened
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: './test/karma.conf.js',
                background: true,
                browsers: ['Chrome']
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('build', ['clean', 'sass','less', 'autoprefixer', 'concat:css','uglify','cssmin']);
    grunt.registerTask('kt',['karma:unit:run']);
    // Default task(s).
    grunt.registerTask('default', ['clean', 'sass','less', 'autoprefixer','concat:css', 'uglify','cssmin','connect','watch']);

};