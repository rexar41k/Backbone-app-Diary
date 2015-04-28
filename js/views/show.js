define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/show.html'
], function($, Backbone, _, Template){

	var EventShow = Backbone.View.extend({
		id: 'show-event',

		template: _.template(Template),

		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
			return this;
		},
	});

	return EventShow;
});