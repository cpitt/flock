(function () {
  'use strict';

  function config($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

  // Declare app level module which depends on views, and components
  angular.module('flock', [
    'ui.router',
    'ngMaterial'
  ])
  .config(config);

}());
