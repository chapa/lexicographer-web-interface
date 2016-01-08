define([], function() {
    'use strict';

    function DashboardController ($scope, GlobalFiltersService, DashboardService) {
        var vm = this;

        vm.templateUrl   = 'templates/dashboard.html';
        vm.globalFilters = GlobalFiltersService;

        vm.data = DashboardService.getData();
        DashboardService.onUpdate(onDataUpdated);

        $scope.$on('$destroy', function () {
            DashboardService.offUpdate(onDataUpdated);
        });

        function onDataUpdated (data) {
            vm.data = data;
        }
    }

    DashboardController.$inject = ['$scope', 'GlobalFiltersService', 'DashboardService'];

    return DashboardController;
});
