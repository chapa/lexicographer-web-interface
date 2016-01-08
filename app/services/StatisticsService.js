define([], function() {
    'use strict';

    function StatisticsService ($http, $q, GlobalFiltersService) {
        var service = {
            getPromise: getPromise,
            getData:    getData,
            update:     update,
            onUpdate:   onUpdate,
            offUpdate:  offUpdate
        };

        var callbacks = [], data = {};

        return service;

        function getPromise () {
            return GlobalFiltersService.getPromise().then(update);
        }

        function getData () {
            return data;
        }

        function update () {
            // Utilisation de GlobalFiltersService pour récupérer les paramètres de la requête à l'API
            return $http.get('data/statistics.json').then(function (response) {
                setData(response.data);
            });
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

        function setData (_data_) {
            data = _data_;

            angular.forEach(callbacks, function (callback) {
                callback(data);
            });
        }
    }

    StatisticsService.$inject = ['$http', '$q', 'GlobalFiltersService'];

    return StatisticsService;
});
