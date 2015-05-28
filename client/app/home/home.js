(function () {
  'use strict';

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
      });
  }

  angular.module('flock')
   .config(config);

}());
