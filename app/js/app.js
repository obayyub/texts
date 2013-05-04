'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/growth', {templateUrl: 'partials/growth.html', controller: GrowthCtrl});
    $routeProvider.when('/plate', {templateUrl: 'partials/plate.html', controller: PlateCtrl});
    $routeProvider.otherwise({redirectTo: '/growth'});
  }]);
