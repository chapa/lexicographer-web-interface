define([], function() {
    'use strict';

    function WordCloudController ($scope, GlobalFiltersService, WordCloudService) {
        var vm = this;

        vm.templateUrl   = 'templates/word-cloud.html'
        vm.globalFilters = GlobalFiltersService;
        
        vm.words = WordCloudService.getData();
        WordCloudService.onUpdate(onDataUpdated);
        vm.reloadWordCloud = reloadWordCloud;

        function onDataUpdated (data) {
            vm.words = data;
        }

        function reloadWordCloud (e) {
            e.preventDefault();
            $scope.$broadcast('app.word-cloud.reload');
        }
    }

    WordCloudController.$inject = ['$scope', 'GlobalFiltersService', 'WordCloudService'];

    return WordCloudController;
});
