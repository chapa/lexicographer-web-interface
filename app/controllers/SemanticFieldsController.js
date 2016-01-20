define([], function() {
    'use strict';

    function SemanticFieldsController ($scope, GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/semantic-fields.html';
        vm.globalFilters = GlobalFiltersService;

        vm.getWords = getWords;
        vm.onWordSelect = onWordSelect;

        vm.data = {
            nodes: [
                { value: 'Un' }, { value: 'Deux' }, { value: 'Trois' }, { value: 'Quatre' }, { value: 'Cinq' },
                { value: 'Six' }, { value: 'Sept' }, { value: 'Huit' }, { value: 'Neuf' }, { value: 'Dix' }
            ],
            links: [
                { source: 0, target: 1 }, { source: 0, target: 2 }, { source: 0, target: 3 }, { source: 1, target: 4 },
                { source: 1, target: 5 }, { source: 4, target: 6 }, { source: 4, target: 7 }, { source: 4, target: 8 },
                { source: 2, target: 9 }, { source: 3, target: 1 }
            ],
            center: null
        };
        vm.data.center = vm.data.nodes[0];

        function getWords (search) {
            return [
                { value: 'Un' },
                { value: 'Deux' },
                { value: 'Trois' },
                { value: 'Quatre' },
                { value: 'Cinq' },
                { value: 'Six' },
                { value: 'Sept' },
                { value: 'Huit' },
                { value: 'Neuf' },
                { value: 'Dix' },
                { value: 'Onze' },
                { value: 'Douze' }
            ].filter(function (word) {
                return word.value.match(new RegExp(search, 'i'));
            }).map(function (word) {
                return vm.data.nodes.find(function (node) {
                    return node.value === word.value
                }) || word;
            });
        }

        function onWordSelect (word) {
            $scope.$broadcast('app.graph.reload');
        }
    }

    SemanticFieldsController.$inject = ['$scope', 'GlobalFiltersService'];

    return SemanticFieldsController;
});
