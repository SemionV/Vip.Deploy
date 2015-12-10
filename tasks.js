var gulp = require('gulp');
var args = require('yargs').argv;
var shell = require('gulp-shell');

gulp.task('log', function(){
	for(var key in args){
		console.log(key + ': ' + args[key]);
	}
});

/*gulp.task('buildLocal', shell.task([
  'msbuild ' + smartDataMsBuildProjPath + ' /t:Build /p:TargetEnvironment=Local;RepositoryDir=' + smartDataRepository
]));*/