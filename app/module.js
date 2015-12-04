define([
    'app/router',
    'app/controllers/TopbarController',
    'app/controllers/HomeController',
    'app/controllers/RequesterController'
], function(router, TopbarController, HomeController, RequesterController) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('TopbarController', TopbarController);
    app.controller('HomeController', HomeController);
    app.controller('RequesterController', RequesterController);
});
