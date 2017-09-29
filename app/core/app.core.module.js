(function(){
	'use strict';

 	angular
 		.module('app.core', [
      'ui.router', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngStorage', 'firebase',
      'md.data.table', 'core.shell', 'core.start', 'biz.services'])
 		.config(coreRun);

 	coreRun.$inject = ['$stateProvider', '$urlRouterProvider']; 

 	function coreRun ($stateProvider, $urlRouterProvider) { 

	   $urlRouterProvider
					.when('', '/')
					.when('/', '/login')
					.otherwise('/login');		
					
		$urlRouterProvider.otherwise("/");

		// TODO add service worker code here
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(function() { console.log('Service Worker Registered'); });
        }
 	}
})();
