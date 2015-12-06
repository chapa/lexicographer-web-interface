define([], function() {
    'use strict';

    function WordCloudController (GlobalFiltersService) {
        this.templateUrl   = 'templates/word-cloud.html'
        this.globalFilters = GlobalFiltersService;
    }

    WordCloudController.$inject = ['GlobalFiltersService'];

    return WordCloudController;
});
