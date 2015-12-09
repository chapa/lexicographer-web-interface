define([], function() {
    'use strict';

    function DashboardController (GlobalFiltersService) {
        this.templateUrl   = 'templates/dashboard.html';
        this.globalFilters = GlobalFiltersService;
    }

    DashboardController.$inject = ['GlobalFiltersService'];

    return DashboardController;
});
