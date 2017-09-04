(function() {
    'use strict';
  
    angular
      .module('core.shell')
      .component('navbar', NavbarComponent());
  
      function NavbarComponent() {
        return {
          templateUrl: './app/core/shell/navbar/navbar.html',
          controller: 'NavbarController',
          bindings: {}
        };
      }
  })();
  