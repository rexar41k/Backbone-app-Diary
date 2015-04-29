define([
    'jquery',
    'backbone',


], function($, Backbone){
	var EventModel = Backbone.Model.extend({
	    defaults: {
	    	eventName: '',
	    	eventText: '',
	    	eventDate: '',
	    	eventRatio: '',
	    	eventVideo: '',
	    	eventMap: '',
	    	eventClass: ''
	    },

	    validate: function(attr) {
	    	if(attr.eventName && attr.eventText && attr.eventDate) {
	    		location.href='#event/add/success';
	    	};
	    },

	    url: '/event',

	    getEvent: function() {
	    	return this.get('eventName');
	    },
	});

	return EventModel;
});