var dot = require('dot');

module.exports = (function(){
	return function(context, property){
		var value = context[property];
		if(typeof value === "function"){
			return value.call(this, context);
		}
		else if(typeof value === "string"){
			var compiled = context[property] = dot.template(value, null, this);
			return compiled.call(this, context);
		}
	}
})();
/*var smartDataRepository = 'c:\\Work\\VIP\\SmartData\\trunk';
var smartDataDeployDir = smartDataRepository + '\\Deploy';
var smartDataMsBuildProjName = 'SmartData.proj';
var smartDataMsBuildProjPath = smartDataDeployDir + '\\' + smartDataMsBuildProjName;*/