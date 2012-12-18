var fs = require('fs'),
		_ = require('underscore'),
		async = require('async'),
		validFiles = [],
		options = {};

_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/gim,
    escape: /\{\{\-(.+?)\}\}/gim,
    evaluate: /\{\{([\s\S]+?)\}\}/gim
};

var UnderscoreTemplates = {};

UnderscoreTemplates.createTemplateEngine = function(o, callback){
	var defaults = {
		location: null,
		caching: false,	//WIP
		extension: '._'
	}

	options = _.extend({}, defaults, o);

	if (!options.location) return callback('MISSING LOCATION OPTION');
	if (!endsWith(options.location, '/')) {
		options.location = options.location + '/'
	}

	UnderscoreTemplates.readDirectory(options.location, options.extension, function(error, fileList) {
		_.each(fileList, function(file) {
			validFiles.push(file.fileName);
		})

		callback(null, validFiles)
	})
}

UnderscoreTemplates.getTemplate = function(template, localVariable, callback) {
	if (!template) return callback('No template string supplied!');

	if ( _.isEmpty(_.filter(validFiles, function(vF){ return template + options.extension == vF })) ) return callback('Not a valid template file!');

	fs.readFile(options.location + template + options.extension, 'utf8', function(e, file) {
		if (e) return callback(e);

		if (!localVariable) return callback(null, _.template(file));
		callback(null, _.template(file, null, {variable: localVariable}) )
	})
}

UnderscoreTemplates.watchDirectory = function(loc, callback) {
	//WIP
	callback(null, null)
}

UnderscoreTemplates.readDirectory = function(loc, extension, callback) {
	var fileStats = [];

	fs.readdir(loc, function(e, fileList) {
		if (e) return callback(e);

		async.forEach(fileList, function(file, cb) {
			fs.stat(loc + file, function(er, stat){
				if ( !stat.isDirectory() && endsWith(file, extension) ) {
					stat.fileName = file;
					fileStats.push(stat);
				}
				cb(er);
			})
		}, function(errors) {
			callback(errors, fileStats);
		})
	})
}

if (require.main === module) {
	//stand-alone code up in hurr
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

module.exports = exports = UnderscoreTemplates;