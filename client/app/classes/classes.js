(function () {

  function config($stateProvider) {
    $stateProvider
      .state('classes', {
        url: '/classes/',
        templateUrl: '',
        controller: 'Controller',
        resolve: {  }
      });
  }

  angular
    .module('flock.classes', [])
    .config(config);
}());
