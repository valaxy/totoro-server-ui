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
		events: {
			'click .submit': function () {
				var runner = this.$('.runner').val()
				$.get(getServerUrl(config) + '/runTask', {
					runner: runner
				}, function (res) {
					console.log(res)
				}, 'json')
			}
		},
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

				socket.on('remove', (id) => {
					this.model.get('labors').get(id).destroy()
				})


				this.listenTo(this.model, 'add:labors', function (labor, labors) {
					this.$('ul').append(new LaborView({model: labor}).$el)
					this.$('.count-info .count').text(labors.length)
				})


				this.listenTo(this.model, 'remove:labors', function (labor, labors) {
					this.$('.count-info .count').text(labors.length)
				})

				var url = getServerUrl(config)
				this.$('.join-info a').text(url).attr('href', url)

				//// head
				//new (Backbone.View.extend({
				//	el: this.$('.head'),
				//	initialize: function () {
				//		this._template = this.$('template').html()
				//		this.render()
				//	},
				//	render: function () {
				//		this.$el.replaceWith(mustache.render(this._template, {
				//			url: getServerUrl(config)
				//		}))
				//	}
				//}))
			})
		}
	})

	return ListView
})