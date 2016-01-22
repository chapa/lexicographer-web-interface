define([], function() {
    'use strict';

    function SemanticFieldsController ($scope, $http, GlobalFiltersService, SemanticFieldsService) {
        var vm = this;

        vm.templateUrl   = 'templates/semantic-fields.html';
        vm.globalFilters = GlobalFiltersService;

        vm.getWords = SemanticFieldsService.getWords;

        vm.data = SemanticFieldsService.getData();
        SemanticFieldsService.onUpdate(onDataUpdated);

        $scope.$on('$destroy', function () {
            SemanticFieldsService.offUpdate(onDataUpdated);
        });

        function onDataUpdated (data) {
            $scope.$broadcast('app.graph.reload');
        }

        $scope.$watch('vm.data.center', function (value) {
            if (angular.isObject(value)) {
                SemanticFieldsService.retreive(value).then(function () {
                    $scope.$broadcast('app.graph.reload');
                });
            }
        });
    }

    SemanticFieldsController.$inject = ['$scope', '$http', 'GlobalFiltersService', 'SemanticFieldsService'];

    return SemanticFieldsController;
});
