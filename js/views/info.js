define([
    'jquery',
    'backbone',
    'text!templates/info.html',
    'underscore'
], function($, Backbone, Template, _){

	var InfoView = Backbone.View.extend({
		template: _.template(Template),

		render: function() {
			this.$el.append(this.template());

			return this;
		},
	});
	
	return InfoView;
});