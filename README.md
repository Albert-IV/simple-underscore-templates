simple-underscore-templating
============================

Really simple templates for Node.js.



Usage:

>
> temp = require('simple-underscore-templates')
> temp.createTemplateEngine({
>			location: __dirname + '/templates',
>			extension: '._'
>		}, function(er, dir) {
>			if (er) throw er;
>		});
>
>


After initialization:

>
> temp.getTemplate( templateName, variableName, function(e, template){
> 	var templateString = template(variable);
>		res.end(templateString);
> })
>
>
>
>