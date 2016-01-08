define([
    'app/router',
    'app/services/GlobalFiltersService',
    'app/services/DashboardService',
    'app/services/StatisticsService',
    'app/services/WordCloudService',
    'app/directives/WordCloudDirective',
    'app/controllers/TopbarController',
    'app/controllers/DashboardController',
    'app/controllers/StatisticsController',
    'app/controllers/WordCloudController',
    'app/controllers/SemanticFieldsController',
], function(router, GlobalFiltersService, DashboardService, StatisticsService, WordCloudService, WordCloudDirective, TopbarController, DashboardController, StatisticsController, WordCloudController, SemanticFieldsController) {
    'use strict';

    var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

    app.config(router);
    app.factory('GlobalFiltersService', GlobalFiltersService);
    app.factory('DashboardService',     DashboardService);
    app.factory('StatisticsService',    StatisticsService);
    app.factory('WordCloudService',     WordCloudService);
    app.directive('tdWordCloud', WordCloudDirective);
    app.controller('TopbarController',         TopbarController);
    app.controller('DashboardController',      DashboardController);
    app.controller('StatisticsController',     StatisticsController);
    app.controller('WordCloudController',      WordCloudController);
    app.controller('SemanticFieldsController', SemanticFieldsController);
});
