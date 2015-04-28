define([
    'jquery',
    'backbone',
    'text!templates/places.html',
    'underscore'
], function($, Backbone, Template, _){

	var PlacesView = Backbone.View.extend({
		template: _.template(Template),

		render: function() {
			this.$el.append(this.template());

			return this;
		},
	});
	
	return PlacesView;
});