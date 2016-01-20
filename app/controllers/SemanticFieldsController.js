define([], function() {
    'use strict';

    function SemanticFieldsController ($scope, $http, GlobalFiltersService) {
        var vm = this;

        vm.templateUrl   = 'templates/semantic-fields.html';
        vm.globalFilters = GlobalFiltersService;

        vm.getWords = getWords;
        vm.onWordSelect = onWordSelect;

        vm.data = {
            nodes: [],
            links: [],
            center: null
        };

        $scope.$watch('vm.data.center', function (value) {
            if (angular.isObject(value)) {
                onWordSelect(value);
            }
        })

        function getWords (search) {
            return $http.get('/api/words', {
                params: {
                    query: search
                }
            }).then(function (response) {
                return response.data.filter(function (word) {
                    return word.match(new RegExp(search, 'i'));
                }).map(function (word) {
                    return vm.data.nodes.find(function (node) {
                        return node.value === word
                    }) || { value: word };
                });;
            });
        }

        function onWordSelect (word) {
            if (vm.data.nodes.indexOf(word) < 0) {
                vm.data.nodes.push(word);
            }

            $http.get('/api/semantic-fields', {
                params: {
                    word: word.value
                }
            }).then(function (response) {
                response.data.forEach(function (linkedWord) {
                    var linkedNode = vm.data.nodes.find(function (node) {
                        return node.value === linkedWord;
                    });

                    if (!linkedNode) {
                        vm.data.nodes.push(linkedNode = { value: linkedWord });
                    }

                    if (!vm.data.links.find(function (link) {
                        return link.source === word && link.target === linkedNode || link.source === linkedNode && link.target === word;
                    })) {
                        vm.data.links.push({
                            source: word,
                            target: linkedNode
                        })
                    }
                });

                $scope.$broadcast('app.graph.reload');
            });
        }
    }

    SemanticFieldsController.$inject = ['$scope', '$http', 'GlobalFiltersService'];

    return SemanticFieldsController;
});
