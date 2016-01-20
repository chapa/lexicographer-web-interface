define([], function () {
    'use strict';

    function BrowsableGraphDirective ($window) {
        var directive = {
            restrict: 'EA',
            template: '<svg></svg>',
            scope: {
                graph: '=tdBrowsableGraph'
            },
            link: linkFunc
        };
        return directive;

        function linkFunc (scope, element, attributes) {
            var d3   = $window.d3,
                data = scope.graph;

            var width  = element[0].offsetWidth,
                height = 400;

            var svg = d3.select(element.find('svg')[0])
                .attr({
                    'width':  width,
                    'height': height
                })
            ;

            var scales = {
                force: {
                    linkDistance: d3.scale.ordinal()
                        .domain([0, 1, 2, 3])
                        .range([150, 75, 20, 0]),
                    charge: d3.scale.ordinal()
                        .domain([0, 1, 2, 3])
                        .range([-500, -300, -100, -100])
                },
                circle: {
                    r: d3.scale.ordinal()
                        .domain([0, 1, 2, 3])
                        .range([40, 30, 15, 0])
                },
                text: {
                    y: d3.scale.ordinal()
                        .domain([0, 1, 2, 3])
                        .range([8, 6, 4, 0]),
                    fontSize: d3.scale.ordinal()
                        .domain([0, 1, 2, 3])
                        .range([20, 15, 10, 0])
                }
            }

            var force = d3.layout.force()
                .nodes(data.nodes)
                .links(data.links)
                .size([width, height])
                .on('tick', tick)
                .start().stop()
            ;

            var links = svg.append('g').attr('class', 'links').selectAll('line'),
                nodes = svg.append('g').attr('class', 'nodes').selectAll('g');

            update();

            scope.$on('app.graph.reload', function () {
                update();
            });

            function update () {
                var visited = [];
                (function recurse (d, depth) {
                    if (visited.indexOf(d) >= 0) {
                        if (d.depth <= depth) {
                            return;
                        }
                    }

                    d.depth = depth;
                    visited.push(d);

                    data.links.forEach(function (link) {
                        if (link.source === d) {
                            recurse(link.target, depth + 1);
                        } else if (link.target === d) {
                            recurse(link.source, depth + 1);
                        }
                    });
                })(data.center, 0);

                force
                    .linkDistance(function (d) {
                        return scales.force.linkDistance(Math.min(d.source.depth, d.target.depth));
                    })
                    .charge(function (d) {
                        return scales.force.charge(d.depth);
                    })
                    .start();
                ;

                links = links.data(data.links.filter(function (d) {
                    return d.source.depth <= 3 && d.target.depth <= 3 && !(d.source.depth == 3 && d.target.depth == 3);
                }));

                links.enter()
                    .append('line')
                    .attr({
                        'class': 'link',
                        'stroke': '#777',
                        'stroke-opacity': '0.2',
                        'stroke-width': '1.5px'
                    })
                ;

                links.exit().remove();

                nodes = nodes.data(data.nodes.filter(function (d) {
                    return d.depth < 3;
                }), function (d) { return d.value; });

                var node = nodes.enter()
                    .append('g')
                    .attr('class', 'node')
                    .on('click', function (d) {
                        if (d3.event.defaultPrevented || d.depth >= 2) return;

                        data.center = d;
                        scope.$apply('data.center');

                        update();
                    })
                    .call(force.drag)
                ;

                nodes.attr('cursor', function (d) {
                    return d.depth < 2 ? 'pointer' : 'auto';
                });

                nodes.select('circle.node')
                    .attr('r', function (d) { return scales.circle.r(d.depth) + 'px'; })
                ;

                node.append('circle')
                    .attr({
                        'class': 'node',
                        'r': function (d) { return scales.circle.r(d.depth) + 'px'; }
                    })
                    .style('fill', '#EEE')
                    .style('stroke', '#DDD')
                    .style('stroke-width', '3px')
                ;

                nodes.select('text.node')
                    .attr({
                        'y': function (d) { return scales.text.y(d.depth) + 'px'; },
                        'font-size': function (d) { return scales.text.fontSize(d.depth) + 'px'; }
                    })
                ;

                node.filter(function (d) {
                    return d.depth < 3;
                }).append('text')
                    .attr({
                        'class': 'node',
                        'y': function (d) { return scales.text.y(d.depth) + 'px'; },
                        'font-size': function (d) { return scales.text.fontSize(d.depth) + 'px'; },
                        'font-family': 'sans-serif',
                        'fill': 'black',
                        'text-anchor': 'middle'
                    })
                    .text( function (d) { return d.value; });

                nodes.exit().remove();
            }

            function tick () {
                links.attr({
                    x1: function (d) { return d.source.x; },
                    y1: function (d) { return d.source.y; },
                    x2: function (d) { return d.target.x; },
                    y2: function (d) { return d.target.y; }
                });

                nodes.attr('transform', function (d) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                });
            }
        }
    }

    BrowsableGraphDirective.$inject = ['$window'];

    return BrowsableGraphDirective;
});

