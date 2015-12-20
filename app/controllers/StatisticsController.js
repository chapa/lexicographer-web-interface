define([], function() {
    'use strict';

    function StatisticsController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/statistics.html';
        vm.globalFilters = GlobalFiltersService;
    }

    StatisticsController.$inject = ['GlobalFiltersService'];

    return StatisticsController;
});
