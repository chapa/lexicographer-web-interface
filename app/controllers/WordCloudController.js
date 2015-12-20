define([], function() {
    'use strict';

    function WordCloudController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/word-cloud.html'
        vm.globalFilters = GlobalFiltersService;
    }

    WordCloudController.$inject = ['GlobalFiltersService'];

    return WordCloudController;
});
