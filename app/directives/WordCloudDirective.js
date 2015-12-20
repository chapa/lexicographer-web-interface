define([], function() {
    'use strict';

    function WordCloudDirective () {
        var directive = {
            restrict: 'EA',
            template: '<canvas></canvas>',
            scope: {
                words: '=tdWordCloud'
            },
            link: linkFunc,
            controller: ['$scope', controllerFunc],
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function linkFunc (scope, element, attributes, vm) {
            var canvas = element.find('canvas');

            vm.width = element[0].offsetWidth;
            vm.height = 300;

            vm.setElement(canvas);
        }

        function controllerFunc ($scope) {
            var vm = this;

            vm.setElement = setElement;

            var element = null, words = [];

            $scope.$watch('vm.words', function (_words_) {
                if (element === null) {
                    return;
                }

                words = [];
                angular.forEach(_words_, function (count, word) {
                    words.push([word, count]);
                });
                drawWordCloud();
            });

            function setElement (_element_) {
                element = _element_;
            }

            function drawWordCloud () {
                element
                    .css({ width: '', height: '' })
                    .attr('width', vm.width)
                    .attr('height', vm.height)
                ;

                WordCloud(element[0], {
                    list: words,
                    gridSize: Math.round(16 * element.attr('width') / 1024),
                    weightFactor: function (size) {
                        return size * element.attr('width') / 100;
                    },
                    rotateRatio: 0.5,
                    backgroundColor: '#ddd'
                });
            }
        }
    }

    WordCloudDirective.$inject = [];

    return WordCloudDirective;
});

