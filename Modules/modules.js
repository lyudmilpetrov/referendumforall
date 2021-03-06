﻿let bgr = angular.module('bgr', ['ngRoute', 'ngResource', 'ngDialog', 'ngAnimate', 'ngAria', 'mp.autoFocus']);
bgr.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
   $routeProvider.when('/offline', {
        templateUrl: 'Views/offline.html',
        controller: 'bgrCtrlIssue',
        controllerAs: 'C3'
    });
    $routeProvider.otherwise({
        templateUrl: 'Views/Start.html',
        controller: 'bgrCtrl'
    });
}]);
bgr.run(['$window', '$rootScope', function ($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
            $rootScope.online = false;
        });
    }, false);
    $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
            $rootScope.online = true;
        });
    }, false);
}]);