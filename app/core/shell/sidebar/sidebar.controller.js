(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope','$mdSidenav', 'LoginService', '$state'];

    function SidebarController($scope, $mdSidenav, LoginService, $state) { 
      $scope.vm = {}; //this makes vm appears in the DOM
      var vm = $scope.vm; //this makes it to appear in here  

      
      vm.name = "Test user";
      
      
      vm.logout = function() {
        LoginService.logout();
        $state.go('login');
      }
   
      vm.closeSidebar = function(e) {
        e.stopPropagation();
        $mdSidenav('sidebar').close();
      }
    }
})();