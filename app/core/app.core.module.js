(function(){
	'use strict';

 	angular
 		.module('app.core', [
      'ui.router', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngStorage', 'firebase',
      'core.shell', 'core.start', 'biz.services'])
 		.config(coreRun);

 	coreRun.$inject = ['$stateProvider', '$urlRouterProvider', 'appRoutes']; 

 	function coreRun ($stateProvider, $urlRouterProvider, appRoutes) { 

		   $urlRouterProvider
						.when('', '/')
						.when('/', '/login')
						.otherwise('/login');		
						
			$urlRouterProvider.otherwise("/");

    // appRoutes
    //   .forEach(
    //     function (route) {
    //       $stateProvider.state(route.name, route.ngroute);
    //     });
 	}
})();
