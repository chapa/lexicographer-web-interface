define([], function() {
    'use strict';

    function DashboardController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/dashboard.html';
        vm.globalFilters = GlobalFiltersService;
    }

    DashboardController.$inject = ['GlobalFiltersService'];

    return DashboardController;
});
