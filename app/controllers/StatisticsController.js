define([], function() {
    'use strict';

    function StatisticsController ($scope, GlobalFiltersService, StatisticsService) {
        var vm = this;

        vm.templateUrl   = 'templates/statistics.html';
        vm.globalFilters = GlobalFiltersService;

        vm.data = StatisticsService.getData();
        StatisticsService.onUpdate(onDataUpdated);

        $scope.$on('$destroy', function () {
            StatisticsService.offUpdate(onDataUpdated);
        });

        function onDataUpdated (data) {
            vm.data = data;
        }
    }

    StatisticsController.$inject = ['$scope', 'GlobalFiltersService', 'StatisticsService'];

    return StatisticsController;
});
