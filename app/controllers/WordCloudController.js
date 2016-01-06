define([], function() {
    'use strict';

    function WordCloudController ($scope, GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/word-cloud.html'
        vm.globalFilters = GlobalFiltersService;
        vm.words = {
            'Flipper': 20, 'Labéliser': 19, 'Andromanie': 19, 'Rééchantillonner': 17, 'Fétiaux': 15,
            'Parution': 13, 'Enrichissement': 13, 'Brelic': 13, 'Addis-beba': 13, 'Convulsionnaire': 12,
            'Cadoule': 12, 'Reparaître': 11, 'Picoreurs': 11, 'Pension': 9, 'Crouttésiens': 8,
            'Microrem': 6, 'Dépolluer': 6, 'Embrasseur': 4, 'Tesseract': 3, 'Youd': 1
        };
        vm.reloadWordCloud = reloadWordCloud;

        function reloadWordCloud (e) {
            e.preventDefault();
            $scope.$broadcast('app.word-cloud.reload');
        }
    }

    WordCloudController.$inject = ['$scope', 'GlobalFiltersService'];

    return WordCloudController;
});
