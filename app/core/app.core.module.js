(function(){
	'use strict';

 	angular
 		.module('app.core', ['core.shell', 'core.start', 'ui.router', 'ngMaterial', 'ngMessages', 'ngSanitize','ngStorage', 'biz.services','firebase'])
 		.config(coreRun);

 	coreRun.$inject = ['$stateProvider', '$urlRouterProvider', 'appRoutes']; 

 	function coreRun ($stateProvider, $urlRouterProvider, appRoutes) { 

    $urlRouterProvider.otherwise("/login");

    appRoutes
      .forEach(
        function (route) {
          $stateProvider.state(route.name, route.ngroute);
        });
 	}
})();
