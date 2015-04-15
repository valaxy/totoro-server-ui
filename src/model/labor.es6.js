define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')

	var Labor = Backbone.RelationalModel.extend({

		defaults: function () {
			return {}
		}
	}, {
		parse: function (info) {
			console.log(info)
			return new Labor(info)
		}
	})

	return Labor
})