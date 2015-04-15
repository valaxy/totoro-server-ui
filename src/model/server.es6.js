define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')
	var Labor = require('./labor')

	var Server = Backbone.RelationalModel.extend({
		relations: [{
			type: Backbone.HasMany,
			key: 'labors',
			relatedModel: Labor,
			reverseRelation: {
				key: 'server'
			}
		}]
	})

	return Server
})