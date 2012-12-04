var fs = require('fs'),
		_ = require('underscore');

var UnderscoreTemplates = {};

UnderscoreTemplates.prototype.createTemplateEngine = function(options, callback){
	var defaults = {
		location: null,
		caching: false	//WIP
	}

	_.extend(defaults, options);

	if (!options.location) return callback('MISSING LOCATION OPTION');

	if (caching) {
		UnderscoreTemplates.watchDirectory(location, function(error, watchObject) {
			if (error) return callback(error);
			callback(null, watchObject);
		})

	} else {

	}

	callback(null, __dirname);
}

UnderscoreTemplates.watchDirectory = function(loc, callback) {
	//WIP
	callback(null, null)
}

UnderscoreTemplates.readDirectory = function(loc, callback) {
	//WIP
	callback(null, null)
}

if (require.main === module) {

}

module.exports = exports = UnderscoreTemplates;