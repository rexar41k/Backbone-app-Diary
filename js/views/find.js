define([
    'jquery',
    'backbone',
    'underscore',
    'views/oneEvent'
], function($, Backbone, _, OneEvent){

	var FindEventView = Backbone.View.extend({
		tagName: 'ul',

		render: function() {
	        this.$el.append(new OneEvent({model: this.model.toJSON()}).render().el);
	        
			return this;
		},
	})

	return FindEventView;
});