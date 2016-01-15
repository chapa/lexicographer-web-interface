define([], function() {
    'use strict';

    function GlobalFiltersService ($http, $filter) {
        var service = {
            getPromise:    getPromise,
            getGenres:     getGenres,
            getAuthors:    getAuthors,
            hasChanged:    hasChanged,
            reset:         reset,
            getParams:     getParams,
            isDirty:       isDirty,
            applyChanges:  applyChanges,
            revertChanges: revertChanges,
            onUpdate:      onUpdate
        };

        var defaults = {
            startDate: null,
            endDate:   null,
            genre:     null,
            author:    null
        }, loaded = {};

        var genres = [];
        var promise = $http.get('/api/date_brackets').then(function (response) {
            service.minDate = defaults.startDate = new Date(response.data.first_date);
            service.maxDate = defaults.endDate = new Date(response.data.last_date);

            return $http.get('/api/genres').then(function (response) {
                genres = response.data;

                angular.forEach(defaults, function (value, key) {
                    service[key] = value;
                    loaded[key] = value;
                });
            })
        });

        var callbacks = [];

        return service;

        function getPromise () {
            return promise;
        }

        function getGenres () {
            return genres;
        }

        function getAuthors (search) {
            return $http.get('/api/authors', {
                params: {
                    name_query: search
                }
            }).then(function (response) {
                return response.data;
            });
        }

        function hasChanged (filterName) {
            if (service[filterName] instanceof Date) {
                return service[filterName].getYear()  !== defaults[filterName].getYear()
                    || service[filterName].getMonth() !== defaults[filterName].getMonth()
                    || service[filterName].getDate()  !== defaults[filterName].getDate();
            } else {
                return service[filterName] !== defaults[filterName];
            }
        }

        function reset (filterName) {
            service[filterName] = defaults[filterName];
        }

        function getParams () {
            var params = {};

            if (hasChanged('startDate')) {
                params.start_date = $filter('date')(service.startDate, 'yyyy-MM-dd');
            } if (hasChanged('endDate')) {
                params.end_date = $filter('date')(service.endDate, 'yyyy-MM-dd');
            } if (service.genre) {
                params.genre = service.genre.id;
            } if (service.author) {
                params.author = service.author.id;
            }

            return params;
        }

        function isDirty () {
            for (var filterName in loaded) {
                if (service[filterName] instanceof Date && (
                    service[filterName].getYear()  !== loaded[filterName].getYear() ||
                    service[filterName].getMonth() !== loaded[filterName].getMonth() ||
                    service[filterName].getDate()  !== loaded[filterName].getDate()
                ) || (!(service[filterName] instanceof Date) && service[filterName] !== loaded[filterName])) {
                    return true;
                }
            }

            return false;
        }

        function applyChanges () {
            for (var filterName in loaded) {
                loaded[filterName] = service[filterName];
            }

            angular.forEach(callbacks, function (callback) {
                callback();
            });
        }

        function revertChanges () {
            for (var filterName in loaded) {
                service[filterName] = loaded[filterName];
            }
        }

        function onUpdate (callback) {
            callbacks.push(callback);
        }
    }

    GlobalFiltersService.$inject = ['$http', '$filter'];

    return GlobalFiltersService;
});
