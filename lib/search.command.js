var search = require('./search.js');
		
module.exports = function command(scope) {
	
	console.log(scope);
	console.log(scope.replacedText);
	switch(scope.label) {
        case 'search':
		search(scope.replacedText.slice(11, scope.replacedText.length));
        break;
        default:

        break;
    }
};