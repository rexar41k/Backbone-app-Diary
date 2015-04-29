define([
    'jquery',
    'backbone',
    'models/model',
], function($, Backbone, Model){

	var Event = Backbone.Collection.extend({
		model: Model,
		sort_key: 'eventDate',

		comparator: function(a) {
	        return a.get(this.sort_key);
	    },

	    sortByField: function(fieldName) {
	        this.sort_key = fieldName;
	        this.sort();
	    }
	});

	return Event;
});