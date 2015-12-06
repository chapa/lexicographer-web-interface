define([], function() {
    'use strict';

    function StatisticsController (GlobalFiltersService) {
        this.templateUrl   = 'templates/statistics.html';
        this.globalFilters = GlobalFiltersService;
    }

    StatisticsController.$inject = ['GlobalFiltersService'];

    return StatisticsController;
});
