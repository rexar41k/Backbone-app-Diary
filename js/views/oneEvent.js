define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/event.html'
], function($, Backbone, _, Template){

	OneEventView = Backbone.View.extend({
		tagName: 'li',
		template: _.template(Template),

		render: function() {
			this.$el.append(this.template({item: this.model}));
			return this;
		},
	});

	return OneEventView;
});