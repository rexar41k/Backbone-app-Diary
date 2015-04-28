define([
    'jquery',
    'backbone',
    'underscore',
    'text!templates/create.html',
], function($, Backbone, _, Template){

	var count = (function () {
	    var counter = 1;

	    return function () {
	    	return counter++;
	    }
	})();

	var EventView = Backbone.View.extend({
		tagName: 'form',

		id: 'event-form',

		events: {
			'submit': "saveEvent",
		},

		template: _.template(Template),

		render: function() {
			this.$el.append(this.template(this.model.toJSON()));

			return this;
		},

		saveEvent: function(e) {

			e.preventDefault();
			var $this = e.currentTarget,
			 	eventName = $($this[0]).val(),
			 	eventText = $($this[1]).val(),
			 	eventDate = $($this[2]).val(),
			 	eventRatio = $($this[3]).val(),
			 	eventVideo = $($this[4]).val(),
			 	eventMap = $('#map-place').val();

			this.model.set({
				eventName: eventName,
				eventText: eventText,
				eventDate: eventDate,
				eventRatio: eventRatio,
				eventVideo: eventVideo,
				eventMap: eventMap,
			},{validate:true});

			if (!this.model.get('id')) {
				this.model.set('id', count());
			};

			if (!this.collection.get(this.model)) {
				this.collection.add(this.model);	
			};
		},

		clearForm: function() {
			this.$el.trigger('reset');
		}
	});

	return EventView;
});