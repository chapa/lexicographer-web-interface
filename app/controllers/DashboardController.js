define([], function() {
    'use strict';

    function DashboardController (GlobalFiltersService, DashboardService) {
        var vm = this;

        vm.templateUrl   = 'templates/dashboard.html';
        vm.globalFilters = GlobalFiltersService;

        vm.data = DashboardService.getData();
        DashboardService.onUpdate(function (data) {
            vm.data = data;
        }); // appelé à chaque affichage de l'onglet
    }

    DashboardController.$inject = ['GlobalFiltersService', 'DashboardService'];

    return DashboardController;
});
