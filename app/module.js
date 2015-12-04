define([
    'app/router',
    'app/controllers/HomeController',
    'app/controllers/RequesterController'
], function(router, HomeController, RequesterController) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('HomeController', HomeController);
    app.controller('RequesterController', RequesterController);
});
