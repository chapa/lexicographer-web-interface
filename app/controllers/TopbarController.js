define([], function() {
    'use strict';

    function TopbarController ($location) {
        var vm = this;

        vm.routeMatch = function (route) {
            return (new RegExp(route)).test($location.path());
        }
    }

    TopbarController.$inject = ['$location'];

    return TopbarController;
});
