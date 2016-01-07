define([], function() {
    'use strict';

    function GlobalFiltersService ($http) {
        var service = {
            getPromise: getPromise,
            getGenres:  getGenres,
            getAuthors: getAuthors,
            hasChanged: hasChanged,
            reset:      reset
        };

        var defaults = {
            startDate: new Date(),
            endDate:   new Date(),
            genre:     null,
            author:    null
        };
        defaults.startDate.setHours(0, 0, 0, 0);
        defaults.endDate.setHours(0, 0, 0, 0);

        var genres = [];
        var promise = $http.get('data/genres.json').then(function (response) {
            genres = response.data;

            angular.forEach(defaults, function (value, key) {
                service[key] = value;
            });
        });

        return service;

        function getPromise () {
            return promise;
        }

        function getGenres () {
            return genres;
        }

        function getAuthors (search) {
            return $http.get('data/authors.json').then(function (response) {
                return response.data.filter(function (author) {
                    // Lors de l'appel à l'API, les données n'auront pas à être filtrées
                    return author.name.indexOf(search) > -1;
                });
            });
        }

        function hasChanged (filterName) {
            if (service[filterName] instanceof Date) {
                return service[filterName].getTime() !== defaults[filterName].getTime();
            } else {
                return service[filterName] !== defaults[filterName];
            }
        };

        function reset (filterName) {
            service[filterName] = defaults[filterName];
        };
    }

    GlobalFiltersService.$inject = ['$http'];

    return GlobalFiltersService;
});
