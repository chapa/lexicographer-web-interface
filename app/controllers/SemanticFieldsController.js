define([], function() {
    'use strict';

    function SemanticFieldsController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/semantic-fields.html';
        vm.globalFilters = GlobalFiltersService;
    }

    SemanticFieldsController.$inject = ['GlobalFiltersService'];

    return SemanticFieldsController;
});
