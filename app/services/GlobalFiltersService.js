define([], function() {
    'use strict';

    function GlobalFiltersService () {
        var service = {
            hasChanged: hasChanged,
            reset: reset
        };

        var defaults = {
            startDate: new Date(),
            endDate:   new Date(),
            genre:     null,
            author:    null
        };
        defaults.startDate.setHours(0, 0, 0, 0);
        defaults.endDate.setHours(0, 0, 0, 0);

        angular.forEach(defaults, function (value, key) {
            service[key] = value;
        });

        return service;

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

    GlobalFiltersService.$inject = [];

    return GlobalFiltersService;
});
