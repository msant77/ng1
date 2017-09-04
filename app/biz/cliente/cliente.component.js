(function() {
    'use strict';
  
    angular
      .module('biz.cliente')
      .component('cliente', BizClienteComponent())
      .config(BizClienteConfig);
  
      function BizClienteComponent() {
        return {
          templateUrl: './app/biz/cliente/cliente.list.html',
          controller: 'BizClienteListController',
          bindings: {}
        };
      }
      
      BizClienteConfig.$inject = ['$stateProvider'];

      function BizClienteConfig($stateProvider) {
        var state = {
          parent: 'shell',
          name: 'cliente',
          url: 'cliente',
          component: 'cliente',
          resolve: {}    
        };
      
        $stateProvider.state(state);
      }
  })();
  