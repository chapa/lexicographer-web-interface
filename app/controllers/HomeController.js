define([], function() {
    'use strict';

    function HomeController ($scope) {
        $scope.lead = 'Page d\'accueil';
    }

    HomeController.$inject = ['$scope'];

    return HomeController;
});
