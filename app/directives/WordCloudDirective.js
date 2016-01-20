define([], function () {
    'use strict';

    function WordCloudDirective () {
        var directive = {
            restrict: 'EA',
            template: '<canvas></canvas>',
            scope: {
                words: '=tdWordCloud',
                width: '=',
                height: '='
            },
            link: linkFunc,
            controller: ['$scope', '$window', controllerFunc],
            controllerAs: 'vm',
            bindToController: true
        };
        return directive;

        function linkFunc (scope, element, attributes, vm) {
            var canvas = element.find('canvas');

            vm.width = element[0].offsetWidth;
            vm.height = 400;

            vm.setElement(canvas);
        }

        function controllerFunc ($scope, $window) {
            var vm = this;

            vm.setElement = setElement;

            var element = null, words = [], w = angular.element($window);

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

            $scope.$on('app.word-cloud.reload', function () {
                drawWordCloud();
            });

            w.on('resize', bindWindowResize);
            $scope.$on('$destroy', function () {
                w.off('resize', bindWindowResize);
            })

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
                        return size * element.attr('width') / 250;
                    },
                    rotateRatio: 0.5,
                    wait: 30,
                    ellipticity: 1
                });
            }

            function bindWindowResize () {
                $scope.$apply('vm.width = ' + element.parent().width());
            }
        }
    }

    WordCloudDirective.$inject = [];

    return WordCloudDirective;
});

