define([
    'app/router',
    'app/controllers/TopbarController',
    'app/controllers/StatisticsController',
    'app/controllers/WordCloudController'
], function(router, TopbarController, StatisticsController, WordCloudController) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('TopbarController', TopbarController);
    app.controller('StatisticsController', StatisticsController);
    app.controller('WordCloudController', WordCloudController);
});
