define([],function(){
    'use strict';

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller:  'HomeController'
            })
            .when('/requester', {
                templateUrl: 'templates/requester.html',
                controller:  'RequesterController'
            })
            .otherwise({
                redirectTo: '/'
            })
        ;

        $locationProvider.html5Mode(true);
    }

    config.$inject = ['$routeProvider', '$locationProvider'];

    return config;
});
