define([], function() {
    'use strict';

    function SemanticFieldsController (GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/semantic-fields.html';
        vm.globalFilters = GlobalFiltersService;

        vm.data = {
            nodes: [
                { value:'Un', depth: 0 },
                { value:'Deux', depth: 1 },
                { value:'Trois', depth: 1 },
                { value:'Quatre', depth: 1 },
                { value:'Cinq', depth: 2 },
                { value:'Six', depth: 2 },
                { value:'Sept', depth: 3 },
                { value:'Huit', depth: 3 },
                { value:'Neuf', depth: 3 },
                { value:'Dix', depth: 2 }
            ],
            links: [
                { source: 0, target: 1 },
                { source: 0, target: 2 },
                { source: 0, target: 3 },
                { source: 1, target: 4 },
                { source: 1, target: 5 },
                { source: 4, target: 6 },
                { source: 4, target: 7 },
                { source: 4, target: 8 },
                { source: 2, target: 9 },
                { source: 3, target: 1 }
            ]
        };
    }

    SemanticFieldsController.$inject = ['GlobalFiltersService'];

    return SemanticFieldsController;
});
