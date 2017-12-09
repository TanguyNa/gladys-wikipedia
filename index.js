var search = require('./lib/search.js');
var command = require('./lib/search.command.js');
var install = require('./lib/install.js');
var uninstall = require('./lib/uninstall.js');

module.exports = function(sails) {

	return {
		search: search,
		command: command,
		install: install,
		uninstall: uninstall
	};
};
