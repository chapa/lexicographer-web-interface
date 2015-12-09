define([], function() {
    'use strict';

    function SemanticFieldsController (GlobalFiltersService) {
        this.templateUrl   = 'templates/semantic-fields.html';
        this.globalFilters = GlobalFiltersService;
    }

    SemanticFieldsController.$inject = ['GlobalFiltersService'];

    return SemanticFieldsController;
});
