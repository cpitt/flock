'use strict';

angular.module('flock')
  .controller('HomeCtrl', function($scope) {
    $scope.yeogurt = 'awesome';
    $scope.derp = function(){
      console.log('derp');
    };
  });
