define(function (require, exports) {
	var io = require('socket.io')

	exports.init = function () {
		var socket = io('http://10.33.68.105:9999/__manager')

		socket.on('init', function (list) {
			console.log(list)
		})

		socket.on('add', function (labor) {
			console.log(labor)
		})
	}
})