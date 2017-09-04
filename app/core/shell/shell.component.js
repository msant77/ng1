(function() {
    'use strict';
  
    angular
      .module('core.shell')
      .component('shell', ShellComponent())
      .config(ShellConfig);
  
      function ShellComponent() {
        return {
          templateUrl: './app/core/shell/shell.html',
          controller: 'ShellController',
          bindings: {}
        };
      }
      
      ShellConfig.$inject = ['$stateProvider'];

      function ShellConfig($stateProvider) {
        var state = {
          name: 'shell',
          url: '/',
          component: 'shell',
          redirectTo: 'login',
          resolve: {}    
        };
      
        $stateProvider.state(state);
      }
  })();
  