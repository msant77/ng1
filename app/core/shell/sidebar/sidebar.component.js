(function() {
    'use strict';
  
    angular
      .module('core.shell')
      .component('sidebar', SidebarComponent());
  
      function SidebarComponent() {
        return {
          templateUrl: './app/core/shell/sidebar/sidebar.html',
          controller: 'SidebarController',
          bindings: {}
        };
      }

  })();