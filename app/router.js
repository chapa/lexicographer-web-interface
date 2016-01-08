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
                controllerAs: 'vm',
                resolve: ['$q', 'GlobalFiltersService', 'DashboardService', function ($q, GlobalFiltersService, DashboardService) {
                    return $q.all([GlobalFiltersService.getPromise(), DashboardService.getPromise()]);
                }]
            })
            .when('/requester/statistics', {
                templateUrl:  'templates/requester.html',
                controller:   'StatisticsController',
                controllerAs: 'vm',
                resolve: ['$q', 'GlobalFiltersService', 'StatisticsService', function ($q, GlobalFiltersService, StatisticsService) {
                    return $q.all([GlobalFiltersService.getPromise(), StatisticsService.getPromise()]);
                }]
            })
            .when('/requester/word-cloud', {
                templateUrl:  'templates/requester.html',
                controller:   'WordCloudController',
                controllerAs: 'vm',
                resolve: ['$q', 'GlobalFiltersService', 'WordCloudService', function ($q, GlobalFiltersService, WordCloudService) {
                    return $q.all([GlobalFiltersService.getPromise(), WordCloudService.getPromise()]);
                }]
            })
            .when('/requester/semantic-fields', {
                templateUrl:  'templates/requester.html',
                controller:   'SemanticFieldsController',
                controllerAs: 'vm',
                resolve: ['GlobalFiltersService', function (GlobalFiltersService) {
                    return GlobalFiltersService.getPromise();
                }]
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
