define([], function() {
    'use strict';

    function GlobalFiltersService () {
        var service = {
            hasChanged: hasChanged,
            reset: reset
        };

        var defaults = {
            startDate: 'start',
            endDate:   'end',
            genre:     null,
            author:    null
        };

        angular.forEach(defaults, function (value, key) {
            service[key] = value;
        });

        return service;

        function hasChanged (filterName) {
            return service[filterName] !== defaults[filterName];
        };

        function reset (filterName) {
            service[filterName] = defaults[filterName];
        };
    }

    GlobalFiltersService.$inject = [];

    return GlobalFiltersService;
});
