var gulp = require('gulp');
require('./tasks');
var settings = require('./settings');
var dot = require('dot');

var config = {};

var smartData =
{
	p: "~",
	repository: 'c:\\Work\\VIP\\SmartData\\trunk',
	deployDir: function(){return this.$(this.smartData, 'repository') + '\\Deploy'},
	interProp: '{{=this.$(it, \'deployDir\')}}',
	templTest: '{{=it.interProp}}\\+',
	desired: '$(config.smartData.repository)\\Deploy'
};
config['smartData'] = smartData;
config.$ = settings;
smartData.interProp = dot.template(smartData.interProp, null, smartData);
smartData.interProp = smartData.interProp.call(config, smartData);
config.someProp = 'some value';

gulp.task('settings', function(){
	var template = '$(first)dsf-$(this.smartData.p)\\Deploy\\$(some)last';
	console.log(template);
	
	var compile = function(template, objectAlias){
		var parts = [{code: 'function(' + objectAlias + '){'}];
		
		var curIndex = 0;		
		var r = new RegExp(/\$\(([\s\S]+?)\)/g);
		match = r.exec(template);
		while (match != null) {
			var str = template.substr(curIndex, match.index - curIndex);
			parts.push(str);

			var code = {code: match[1]};
			parts.push(code);

			curIndex = match.index + match[0].length;
			
			match = r.exec(template);
		}

		if(curIndex < template.length){
			var str = template.substr(curIndex, template.length - curIndex);
			console.log(str);
			parts.push(str);
		}
		
		parts.push({code:'}'});
		
		return parts;
	};
	
	var parts = compile(template);
	
	for(var i = 0; i < parts.length; i++){
		console.log(parts[i]);
	}
});

gulp.task('ci', []);