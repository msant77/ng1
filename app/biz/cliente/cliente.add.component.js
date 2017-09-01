(function() {
    'use strict';
  
    angular
      .module('biz.cliente')
      .component('add', BizClienteComponent())
      .config(BizClienteConfig);
  
      function BizClienteComponent() {
        return {
          templateUrl: './app/biz/cliente/cliente.add.html',
          controller: 'BizClienteAddController',
          bindings: {}
        };
      }
      
      BizClienteConfig.$inject = ['$stateProvider'];

      function BizClienteConfig($stateProvider) {
        var state = {
          parent: 'shell',
          name: 'add',
          url: 'add',
          component: 'add',
          resolve: {}    
        };
      
        $stateProvider.state(state);
      }
  })();
  