(function () {
  'use strict';

  function config($urlRouterProvider, $locationProvider, $mdIconProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $mdIconProvider
      .fontSet('fa', 'fontawesome');


  }

  // Declare app level module which depends on views, and components
  angular.module('flock', [
    'ui.router',
    'ngMaterial'
  ])
  .config(config);

}());
