(function() {
  'use strict';
	var coreStart = angular.module('core.start', []); 

  fetchData().then(bootstrapApplication);

  function fetchData() {
    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');

    return $http.get('/app/core/start/settings.json').then(function(response) {
      var config = response.data.config;
      coreStart.constant('config', config);
      coreStart.constant('appRoutes', response.data.routes); 
      var configfirebase = {
            apiKey: config.apiKey,
            authDomain: config.authDomain,
            databaseURL: config.databaseURL,
            projectId: config.projectId,
            storageBucket: config.storageBucket,
            messagingSenderId: config.messagingSenderId
        };
        firebase.initializeApp(configfirebase);

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