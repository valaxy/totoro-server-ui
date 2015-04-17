define(function (require, exports) {
	var ListView = require('./list-view')
	require('../util/sync')

	exports.init = function () {
		new ListView
	}
})