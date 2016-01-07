define([], function() {
    'use strict';

    function DashboardService ($http) {
        var service = {
            getPromise: getPromise,
            getData:    getData,
            update:     update,
            onUpdate:   onUpdate
        };

        var callbacks = [], data = {};

        return service;

        function getPromise () {
            return update();
        }

        function getData () {
            return data;
        }

        function update () {
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

    DashboardService.$inject = ['$http'];

    return DashboardService;
});
