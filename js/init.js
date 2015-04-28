requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: 'library/jquery.min',
        backbone: 'library/backbone-min',
        underscore: 'library/underscore-min',
        text: 'library/text'
    },
    shim: {
        'underscore': {
            exports: '_'
        },		
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
    }
});

require([
	'backbone',
	'collections/events',
	'routers/router',
    'models/model'
], function (Backbone, Collection, Workspace, Model) {
	// инициализируем роутер и стартуем Backbone.history()
	new Workspace();
	Backbone.history.start();

});
