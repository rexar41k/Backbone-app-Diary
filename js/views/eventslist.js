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

		render: function() {
			that = this;
			this.$el.append(this.template());
			this.collection.each(function(model) {
	            that.$el.append(new OneEvent({model: model.toJSON()}).render().el);
	        });
	        
			return this;
		},

		events: {
			'click .delete': "deleteEvent"
		},

		deleteEvent: function (e) {
			var conf = confirm("Хотите удалить событие?");
			if(!conf) {
				e.preventDefault()
			}
		}
	});

	return ListEventView;
});