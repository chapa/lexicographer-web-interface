define([], function() {
    'use strict';

    function GlobalFiltersService ($http, $filter) {
        var service = {
            getPromise: getPromise,
            getGenres:  getGenres,
            getAuthors: getAuthors,
            hasChanged: hasChanged,
            reset:      reset,
            getParams:  getParams
        };

        var defaults = {
            startDate: null,
            endDate:   null,
            genre:     null,
            author:    null
        };

        var genres = [];
        var promise = $http.get('/api/date_brackets').then(function (response) {
            defaults.startDate = new Date(response.data.first_date + ' 0:0');
            defaults.endDate = new Date(response.data.last_date + ' 0:0');

            return $http.get('/api/genres').then(function (response) {
                genres = response.data;

                angular.forEach(defaults, function (value, key) {
                    service[key] = value;
                });
            })
        });

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
                return service[filterName].getTime() !== defaults[filterName].getTime();
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
                params.genre = service.genre;
            } if (service.author) {
                params.author = service.author;
            }

            return params;
        }
    }

    GlobalFiltersService.$inject = ['$http', '$filter'];

    return GlobalFiltersService;
});
