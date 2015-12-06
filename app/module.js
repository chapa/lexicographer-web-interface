define([
    'app/router',
    'app/controllers/TopbarController',
    'app/controllers/StatisticsController',
    'app/controllers/WordCloudController',
    'app/services/GlobalFiltersService'
], function(router, TopbarController, StatisticsController, WordCloudController, GlobalFiltersService) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('TopbarController',     TopbarController);
    app.controller('StatisticsController', StatisticsController);
    app.controller('WordCloudController',  WordCloudController);
    app.service('GlobalFiltersService', GlobalFiltersService);
});
