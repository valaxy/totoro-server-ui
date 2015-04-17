define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')

	var Labor = Backbone.RelationalModel.extend({

		defaults: function () {
			return {}
		}
	}, {
		parse: function (id, info) {
			console.log(info)
			var labor = new Labor(info)
			labor.set('id', id)
			return labor
		}
	})

	return Labor
})