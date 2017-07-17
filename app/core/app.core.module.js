(function(){
	'use strict';

 	angular
 		.module('app.core', ['core.shell', 'core.start', 'ui.router'])
 		.config(coreRun);

 	coreRun.$inject = ['$stateProvider', '$urlRouterProvider', 'appRoutes']; 

 	// function coreRun () { 
 	function coreRun ($stateProvider, $urlRouterProvider, appRoutes) { 

    $urlRouterProvider.otherwise("/");

    appRoutes
      .forEach(
        function (route) {
          $stateProvider.state(route.name, route.ngroute);
        });

    console.log(appRoutes); 
 	}


})();
