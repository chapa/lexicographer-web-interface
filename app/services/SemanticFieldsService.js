define([], function() {
    'use strict';

    function SemanticFieldsService ($http, $q, GlobalFiltersService) {
        var service = {
            getData:    getData,
            getWords:   getWords,
            retreive:   retreive,
            clear:      clear,
            onUpdate:   onUpdate,
            offUpdate:  offUpdate
        };

        var callbacks = [], data = {
            nodes: [],
            links: [],
            center: null
        };

        return service;

        function getData () {
            return data;
        }

        function getWords (search) {
            return $http.get('/api/words', {
                params: {
                    query: search
                }
            }).then(function (response) {
                return response.data.filter(function (word) {
                    return word.match(new RegExp(search, 'i'));
                }).map(function (word) {
                    return data.nodes.find(function (node) {
                        return node.value === word
                    }) || { value: word };
                });;
            });
        }

        function retreive (word) {
            if (data.nodes.indexOf(word) < 0) {
                data.nodes.push(word);
            }

            return $http.get('/api/semantic-fields', {
                params: {
                    word: word.value
                }
            }).then(function (response) {
                response.data.forEach(function (linkedWord) {
                    var linkedNode = data.nodes.find(function (node) {
                        return node.value === linkedWord;
                    });

                    if (!linkedNode) {
                        data.nodes.push(linkedNode = { value: linkedWord });
                    }

                    if (!data.links.find(function (link) {
                        return link.source === word && link.target === linkedNode || link.source === linkedNode && link.target === word;
                    })) {
                        data.links.push({
                            source: word,
                            target: linkedNode
                        });
                    }
                });
            });
        }

        function clear () {
            data.center = null;
            data.nodes = [];
            data.links = [];

            notifyUpdate();
        }

        function onUpdate (callback) {
            callbacks.push(callback);
        }

        function offUpdate (callback) {
            var index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }

        function notifyUpdate () {
            angular.forEach(callbacks, function (callback) {
                callback(data);
            });
        }
    }

    SemanticFieldsService.$inject = ['$http', '$q', 'GlobalFiltersService'];

    return SemanticFieldsService;
});
