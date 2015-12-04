define([], function() {
    'use strict';

    function TopbarController ($location) {
        this.isActive = function (route) {
            return route === $location.path();
        }
    }

    TopbarController.$inject = ['$location'];

    return TopbarController;
});
