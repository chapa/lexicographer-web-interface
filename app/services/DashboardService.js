define([], function() {
    'use strict';

    function DashboardService ($http, $q, GlobalFiltersService) {
        var service = {
            getPromise: getPromise,
            getData:    getData,
            update:     update,
            onUpdate:   onUpdate,
            offUpdate:  offUpdate
        };

        var callbacks = [], data = null;

        return service;

        function getPromise () {
            return GlobalFiltersService.getPromise().then(function () {
                if (data === null) {
                    return update();
                }
            });
        }

        function getData () {
            return data;
        }

        function update () {
            return $http.get('/api/dashboard', {
                params: GlobalFiltersService.getParams()
            }).then(function (response) {
                response.data.date_first_book = new Date(response.data.date_first_book);
                response.data.date_last_book = new Date(response.data.date_last_book);
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

    DashboardService.$inject = ['$http', '$q', 'GlobalFiltersService'];

    return DashboardService;
});
