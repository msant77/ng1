var gulp = require("gulp");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
const babel = require('gulp-babel');
var htmlmin = require('gulp-htmlmin');
var strip = require('gulp-strip-comments');

gulp.task('default', ['html','libjs','appjs','appcss']);

gulp.task('html',function(){
  return gulp.src('./index.html')
    .pipe(gulp.dest('./bkp/'))
    .pipe(strip())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('appcss',function(){

	return gulp.src([
    	"assets/css/app.css",
    	"app/biz/cliente/grid.css",
    	"js/src/angular-material-data-table/dist/md-data-table.min.css"
	])
	.pipe(concat('app.css'))
	.pipe(gulp.dest('./dist/css/'));
});

gulp.task('libjs',function(){
	return gulp.src([
		"js/src/angular/angular.min.js",
	    "js/src/angular-resource/angular-resource.min.js",
	    "js/src/angular-ui-router/release/angular-ui-router.min.js",
	    "js/src/angular-sanitize/angular-sanitize.min.js",
	    "js/src/ngstorage/ngStorage.min.js",
	    "js/src/angular-messages/angular-messages.min.js",
	    "js/src/angular-aria/angular-aria.min.js",
	    "js/src/angular-animate/angular-animate.min.js",
	    "js/src/angular-material/angular-material.min.js",
	    "js/src/angularfire/dist/angularfire.min.js",
      "js/src/firebase/firebase.js",
	    "js/src/angular-material-data-table/dist/md-data-table.js"
		])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('./dist/js/'))
		.pipe(rename('lib.min.js'))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('appjs',function(){
	return gulp.src([
		'app/app.module.js',
	    'app/core/app.core.module.js',

	    'app/core/start/core.start.module.js',
	    'app/core/shell/core.shell.module.js',

	    'app/core/modal/core.modal.service.js',
	    'app/core/modal/core.modal.controller.js',

	    'app/biz/app.biz.module.js',

	    'app/biz/services/biz.services.module.js',

	    'app/biz/cliente/cliente.module.js',
	    'app/biz/cliente/cliente.service.js',
	    'app/biz/cliente/cliente.list.controller.js',
	    'app/biz/cliente/cliente.details.controller.js',
	    'app/biz/cliente/cliente.component.js',
	    'app/biz/cliente/cliente.add.component.js',
	    'app/biz/cliente/cliente.add.controller.js',

	    'app/biz/user/user.module.js',
	    'app/biz/user/user.service.js',

	    'app/core/shell/shell.controller.js',
	    'app/core/shell/shell.component.js',

	    'app/core/localdb/core.localdb.service.js',
	    
	    'app/core/login/login.service.js',
	    'app/core/login/login.controller.js',
	    'app/core/login/login.component.js',
	    
	    'app/core/shell/navbar/navbar.controller.js',
	    'app/core/shell/navbar/navbar.component.js',
	    'app/core/shell/sidebar/sidebar.controller.js',
	    'app/core/shell/sidebar/sidebar.component.js'	    
	])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('./dist/js/'))
	.pipe(rename('app.min.js'))
	.pipe(babel({
      presets: ['es2015']
  }))
  .pipe(uglify().on('error', function(e){
    console.log(e);
  }))
  .pipe(gulp.dest('./dist/js/'));
});
