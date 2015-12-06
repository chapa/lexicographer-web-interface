define([], function() {
    'use strict';

    function TopbarController ($location) {
        this.routeMatch = function (route) {
            return (new RegExp(route)).test($location.path());
        }
    }

    TopbarController.$inject = ['$location'];

    return TopbarController;
});
