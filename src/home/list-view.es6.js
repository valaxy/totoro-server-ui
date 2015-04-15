define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')
	var io = require('socket.io')
	var $ = require('jquery')
	var mustache = require('mustache')


	var Server = require('../model/server')
	var Labor = require('../model/labor')
	var LaborView = require('./labor-view')


	var ListView = Backbone.View.extend({
		events: {},
		initialize: function () {
			this.setElement($('.list'))
			this.model = new Server


			var socket = io('http://10.33.68.105:9999/__manager')

			socket.on('init', (list) => {
				for (var id in list) {
					var laborInfo = list[id]
					this.model.get('labors').add(Labor.parse(laborInfo))
				}
			})

			socket.on('add', (laborInfo) => {
				this.model.add(Labor.parse(laborInfo))
				headView.remove()
				headView.render().$el
			})


			this.listenTo(this.model, 'add:labors', function (labor) {
				this.$('ul').append(new LaborView({model: labor}).$el)
			})


			var headView = new (Backbone.View.extend({
				el: this.$('head'),
				template: function () {
					return this.$('template')
				},
				render: function () {
					return this.setElement(mustache.render(this.template(), {
						count: 123
					}))
				}
			}))
		}
	})

	return ListView
})