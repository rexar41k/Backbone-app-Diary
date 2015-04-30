define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/list.html',
    'models/model',
    'collections/events',
    'views/oneEvent'
], function($, Backbone, _, Template, Model, eventCollection, OneEvent){

	var ListEventView = Backbone.View.extend({
		tagName: 'ul',
		template: _.template(Template),

		initialize: function() {
	        this.collection.on('sort', this.render, this);
	        this.collection.on('reset', this.render, this);
	    },

		render: function() {
			this.$el.empty();
			that = this;
			this.$el.append(this.template());
			this.collection.each(function(model) {
	            that.$el.append(new OneEvent({model: model.toJSON()}).render().el);
	        });
	        
			return this;
		},

		events: {
			'click .delete'        : "deleteEvent",
			'click #ratio-sort'    : "ratioSort",
			'click #date-sort'     : "dateSort",
			'click #find-name'     : "findName",
			'focus #find-name-text': "focusText"
		},

		focusText: function () {
			var names = collect.toJSON(),
				newNames = [];
			for (var i = 0; i < names.length; i++) {
				newNames.push(names[i].eventName);
			};

			$( "#find-name-text" ).autocomplete({
		      source: newNames
		    });
		},

		findName: function (e) {
			e.preventDefault();
			var name = $('#find-name-text').val();
			window.location.href = '#event/find/' + name
		},

		deleteEvent: function (e) {
			var conf = confirm("Хотите удалить событие?");
			if(!conf) {
				e.preventDefault()
			}
		},

		ratioSort: function (e) {
	        collect.sortByField('eventRatio');
		},

		dateSort: function (e) {
	        collect.sortByField('eventDate');
	    }
	});

	return ListEventView;
});