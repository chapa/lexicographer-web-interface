define([
    'app/router',
    'app/controllers/TopbarController',
    'app/controllers/DashboardController',
    'app/controllers/StatisticsController',
    'app/controllers/WordCloudController',
    'app/controllers/SemanticFieldsController',
    'app/services/GlobalFiltersService'
], function(router, TopbarController, DashboardController, StatisticsController, WordCloudController, SemanticFieldsController, GlobalFiltersService) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

    app.config(router);
    app.controller('TopbarController',         TopbarController);
    app.controller('DashboardController',      DashboardController);
    app.controller('StatisticsController',     StatisticsController);
    app.controller('WordCloudController',      WordCloudController);
    app.controller('SemanticFieldsController', SemanticFieldsController);
    app.factory('GlobalFiltersService', GlobalFiltersService);
});
