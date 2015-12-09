define([],function(){
    'use strict';

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html'
            })
            .when('/requester/dashboard', {
                templateUrl:  'templates/requester.html',
                controller:   'DashboardController',
                controllerAs: 'c'
            })
            .when('/requester/statistics', {
                templateUrl:  'templates/requester.html',
                controller:   'StatisticsController',
                controllerAs: 'c'
            })
            .when('/requester/word-cloud', {
                templateUrl:  'templates/requester.html',
                controller:   'WordCloudController',
                controllerAs: 'c'
            })
            .when('/requester/semantic-fields', {
                templateUrl:  'templates/requester.html',
                controller:   'SemanticFieldsController',
                controllerAs: 'c'
            })
            .when('/requester', {
                redirectTo: '/requester/dashboard'
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
