define([
    'app/router',
    'app/controllers/HomeController'
], function(router, HomeController) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('HomeController', HomeController);
});
