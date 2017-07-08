(function() {
  'use strict';
	var coreStart = angular.module('app.start', []);

  fetchData().then(bootstrapApplication);

  function fetchData() {
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');

    return $http.get('/app/core/start/settings.json').then(function(response) {
      commonServices.constant('appSettings', response.data.settings);
      commonServices.constant('appRoutes', response.data.routes); 
    }, function(errorResponse) {
      console.log('It was not possible to load the configuration file.');
    });
  }

  function bootstrapApplication() {
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['app']);
    });
  }
}());