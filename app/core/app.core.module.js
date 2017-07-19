(function(){
	'use strict';

 	angular
 		.module('app.core', ['core.shell', 'core.start', 'ui.router', 'ui.bootstrap', 'ngStorage'])
 		.config(coreRun);

 	coreRun.$inject = ['$stateProvider', '$urlRouterProvider', 'appRoutes']; 

 	function coreRun ($stateProvider, $urlRouterProvider, appRoutes) { 

    $urlRouterProvider.otherwise("/");

    appRoutes
      .forEach(
        function (route) {
          $stateProvider.state(route.name, route.ngroute);
        });
 	}
})();
