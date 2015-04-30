define([
    'jquery',
    'backbone',
    'views/info',
    'collections/events',
    'views/show',
    'views/eventslist',
    'views/event',
    'models/model',
    'views/places',
    'views/find',
    'library/jquery-ui.min',
    'library/parsley.min',
    'library/ru',
], function($, Backbone, InfoView, eventCollection, EventShow, ListEventView, EventView, Event, PlacesView, FindEventView){

    var Router = Backbone.Router.extend({

        routes: {
            ""                 : "showInfo" ,
            "info"             : "showInfo",
            "events"           : "showEvents",
            "places"           : "showPlaces",
            "event/add"        : "createEvent",
            "event/:id"        : "showOneEvent",
            "event/edit/:id"   : "eventEdit",
            "event/find/:name" : "findEvent",
            'event/add/success': "eventSuccessAdd",
            "event/delete/:id" : "eventDelete",
            "*default"         : "showDefault",
        },

        initialize: function () {
            window.collect = new eventCollection();

            if(localStorage.getItem('collect')) {
                collect.add(JSON.parse(localStorage.getItem('collect')));
            }
        },

        eventSuccessAdd: function () {
            $('h3').text("Событие успешно создано!");
            $('#main').html('<a href="#"><button>На главную</button></a><a href="#events"><button> К списку событий </button>');
            localStorage.setItem('collect', JSON.stringify(collect.toJSON()));
            localStorage.setItem('counter', window.counter);
        },

        findEvent: function (name) {
            $('h3').text("Нашли событие с именем: " + name);
            var names = collect.findWhere({eventName: name}),
                view = new FindEventView({model: names});
            $('#main').html(view.render().$el);
        },

        showOneEvent: function (id) {
            $('h3').text("Просмотр события с id: " + id);
            var event = collect.findWhere({id: +id}),
                view = new EventShow({model: event});
            $('#main').html(view.render().$el);
        },

        showPlaces: function () {
            $('h3').text("Список мест:");
            var view = new PlacesView();
            $('#main').html(view.render().$el);

            var myLatlng = new google.maps.LatLng(50, 36.3);
            var mapOptions = {
              zoom: 1,
              center: myLatlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            }

            var map = new google.maps.Map(document.getElementById("map-list"), mapOptions);

            var markers = [];
            function createMarkers() {
                for (var i = 0; i < collect.models.length; i++) {
                    if (collect.models[i].toJSON().eventMap != '') {
                        var marker = collect.models[i].toJSON().eventMap.split(','),
                            name = collect.models[i].toJSON().eventName,
                            url = '#event/' + collect.models[i].toJSON().id;
                        var newMarker = {x: marker[0], y: marker[1], eventName: name, url: url};
                        markers.push(newMarker);
                    };
                };
            };

            function createMarkerList() {
              for (var i = 0; i < markers.length; i++) {

                    var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(markers[i].x, markers[i].y),
                      title: markers[i].eventName,
                      url: markers[i].url,
                      map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                      window.location.href = this.url;
                    });
              };
            };
            createMarkers();
            createMarkerList();
        },

        showDefault: function () {
            $('h3').text("404 ОШИБКА");
            $('#main').html('<a href="#"><button>На главную</button></a>');
        },

        showEvents: function() {
            $('h3').text("Список событий:");
            var view = new ListEventView({collection: collect});
            $('#main').html(view.render().$el);
        },

        showInfo: function() {
            $('h3').text("Оффлайн приложение «Дневник»");
            var view = new InfoView();
            $('#main').html(view.render().$el);
        },

        createDatePicker: function () {
            $("#datepicker").datepicker();
        },

        createParsley: function () {
            $('#event-form').parsley();
            window.ParsleyValidator.setLocale('ru');
        },

        createMap: function () {
            var mapOptions = {
              center: new google.maps.LatLng(50, 36.3),
              zoom: 10,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
         
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

            var marker;

            function placeMarker(location) {
                $('#map-place').val(location.toUrlValue())
                  if ( marker ) {
                    marker.setPosition(location);
                  } else {
                    marker = new google.maps.Marker({
                      position: location,
                      map: map,
                    });
                  }
            };

            google.maps.event.addListener(map, 'click', function(event) {
                placeMarker(event.latLng);
            });
        },

        createVideo: function () {
            if($('#inputVideo').val() === '') {
                $('#inputVideo').on('change', function() { // при изменении показываем
                    var video = $('#inputVideo').val();
                    if(video.indexOf("youtube") != -1) {
                        var newVideo = video.split("=");
                        $('#object').attr("data", "http://www.youtube.com/v/" + newVideo[1]);
                        $('#object').show();
                    } else {
                        $('#object').hide();
                    };
                });
            } else if($('#inputVideo').val() !== undefined){
                var vid = $('#inputVideo').val();
                var newVid = vid.split("=");
                $('#object').attr("data", "http://www.youtube.com/v/" + newVid[1]);
                $('#object').show();
            }
        },

        createEvent: function() {
            $('h3').text("Создание нового события:");
            var view = new EventView({model: new Event(), collection: collect});
            $('#main').html(view.render().$el);

            this.textRedactor();
            this.createDatePicker();
            this.createParsley();
            this.createMap();
            this.createVideo();
        },

        textRedactor: function () {
            $('#button-show').click(function(e) {
                e.preventDefault();
                $('#show-redactor').toggle()
                $('#button-show').toggleText("Скрыть редактор", "Показать редактор");
            });

            $('#event-form :checkbox').change(function() {
                switch (this.id) {
                    case 'bold':
                        $('#myTextArea').toggleClass('text-bold');
                        break
                    case 'italic':
                        $('#myTextArea').toggleClass('text-italic');
                        break
                    case 'underline':
                        $('#myTextArea').toggleClass('text-underline');
                        break
                }
            });

            $('#event-form #select').change(function() {
                switch ($("#select").val()) {
                    case '14px':
                        $('#myTextArea').removeClass('text-18px text-22px').addClass('text-14px');
                        break
                    case '18px':
                        $('#myTextArea').removeClass('text-14px text-22px').addClass('text-18px');
                        break
                    case '22px':
                        $('#myTextArea').removeClass('text-18px text-14px').addClass('text-22px');
                        break
                }
            });

            $('#event-form input[type="radio"]').change(function() {
                switch (this.value) {
                    case 'red':
                        $('#myTextArea').removeClass('text-green text-blue').addClass('text-red');
                        break
                    case 'green':
                        $('#myTextArea').removeClass('text-red text-blue').addClass('text-green');
                        break
                    case 'blue':
                        $('#myTextArea').removeClass('text-red text-green').addClass('text-blue');
                        break
                }
                $('#myTextArea').css('color', this.value);
            });

            $.fn.toggleText = function (newText, oldText){
                if (this.text() == newText){
                    this.text(oldText);
                } else {
                    this.text(newText)
                }
            }
        },

        eventEdit: function(id) {
            $('h3').text("Редактирование события с id:" + id);
            var event = collect.findWhere({id: +id}),
                view = new EventView({model: event, collection: collect});

            $('#main').html(view.render().$el);

            this.textRedactor();
            this.createDatePicker();
            this.createParsley();
            this.createMap();
            this.createVideo();
        },

        eventDelete: function(id) {
            $('h3').text("Вы успешно удалили событие с id:" + id + "!");
            var model = collect.findWhere({id: +id});

            $('#main').html('<a href="#events"><button> К списку событий </button>');
            model.destroy();
        },

    });

    return Router;
});