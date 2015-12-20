define([], function() {
    'use strict';

    function WordCloudController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/word-cloud.html'
        vm.globalFilters = GlobalFiltersService;
        vm.words = {
            'Cadoule': 1, 'Embrasseur': 17, 'Enrichissement': 11, 'Fétiaux': 5, 'Microrem': 20,
            'Parution': 7, 'Picoreurs': 10, 'Reparaître': 3, 'Rééchantillonner': 4, 'Youd': 16,
            'Addis-beba': 8, 'Andromanie': 7, 'Brelic': 15, 'Convulsionnaire': 15, 'Crouttésiens': 19,
            'Dépolluer': 2, 'Flipper': 4, 'Labéliser': 6, 'Pension': 17, 'Tesseract': 17
        };
    }

    WordCloudController.$inject = ['GlobalFiltersService'];

    return WordCloudController;
});
