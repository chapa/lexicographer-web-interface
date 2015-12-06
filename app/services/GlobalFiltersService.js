define([], function() {
    'use strict';

    function GlobalFiltersService () {
        var defaults = {
            startDate: 'start',
            endDate:   'end'
        };

        angular.forEach(defaults, function (value, key) {
            this[key] = value;
        }, this);

        this.hasChanged = function (filterName) {
            return this[filterName] !== defaults[filterName];
        };

        this.reset = function (filterName) {
            this[filterName] = defaults[filterName];
        };
    }

    GlobalFiltersService.$inject = [];

    return GlobalFiltersService;
});
