define(function (require) {
	var Backbone = require('backbone')
	require('backbone-relational')
	var $ = require('jquery')
	var mustache = require('mustache')

	var Server = require('../model/server')
	var Labor = require('../model/labor')
	var LaborView = require('./labor-view')

	var config = require('json!../config.json')

	var getServerUrl = function (config) {
		return 'http://' + config.serverAddress + ':' + config.serverPort
	}

	var ListView = Backbone.View.extend({
		events: {},
		initialize: function () {
			this.setElement($('.everything'))
			this.model = new Server

			require([getServerUrl(config) + '/socket.io/socket.io.js'], (io) => {
				var socket = io(getServerUrl(config) + '/__manager')

				socket.on('init', (list) => {
					for (var id in list) {
						var laborInfo = list[id]
						this.model.get('labors').add(Labor.parse(id, laborInfo))
					}
				})

				socket.on('add', (list) => {
					for (var id in list) {
						var laborInfo = list[id]
						this.model.get('labors').add(Labor.parse(id, laborInfo))
					}
				})


				this.listenTo(this.model, 'add:labors', function (labor, labors) {
					this.$('ul').append(new LaborView({model: labor}).$el)
					this.$('.list > div .count').text(labors.length)
				})


				// head
				new (Backbone.View.extend({
					el: this.$('.head'),
					initialize: function () {
						this._template = this.$('template').html()
						this.render()
					},
					render: function () {
						this.$el.replaceWith(mustache.render(this._template, {
							url: getServerUrl(config)
						}))
					}
				}))
			})
		}
	})

	return ListView
})