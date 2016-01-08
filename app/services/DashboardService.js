define([], function() {
    'use strict';

    function DashboardService ($http, $q, GlobalFiltersService) {
        var service = {
            getPromise: getPromise,
            getData:    getData,
            update:     update,
            onUpdate:   onUpdate
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
            return $http.get('data/dashboard.json').then(function (response) {
                response.data.date_first_book = new Date(response.data.date_first_book);
                response.data.date_last_book = new Date(response.data.date_last_book);
                setData(response.data);
            });
        }

        function onUpdate (callback) {
            callbacks.push(callback);
        }

        function setData (_data_) {
            data = _data_;

            angular.forEach(callbacks, function (callback) {
                callback(data);
            });
        }
    }

    DashboardService.$inject = ['$http', '$q', 'GlobalFiltersService'];

    return DashboardService;
});
