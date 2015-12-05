define([
    'app/router',
    'app/controllers/TopbarController',
    'app/controllers/RequesterController'
], function(router, TopbarController, RequesterController) {
    'use strict';

    var app = angular.module('app', ['ngRoute']);

    app.config(router);
    app.controller('TopbarController', TopbarController);
    app.controller('RequesterController', RequesterController);
});
