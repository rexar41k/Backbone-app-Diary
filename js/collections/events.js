define([
    'jquery',
    'backbone',
    'models/model',
], function($, Backbone, Model){

	var Event = Backbone.Collection.extend({
		model: Model
	});

	return Event;
});