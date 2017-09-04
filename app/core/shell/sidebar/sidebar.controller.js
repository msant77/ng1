(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope','$mdSidenav', 'LoginService', '$state','localdb'];

    function SidebarController($scope, $mdSidenav, LoginService, $state, localdb) { 
      $scope.vm = {}; //this makes vm appears in the DOM
      var vm = $scope.vm; //this makes it to appear in here  

      function init(){
        var user = localdb.get("loggeduser");
        var name = user.name.split(' ');
        vm.name = name[0];
        vm.photo = user.photo;  
      }
      
      
      vm.go = function(state) {
        $state.go(state);
      }

      vm.logout = function() {
        LoginService.logout();
        $state.go('login');
      }
   
      vm.closeSidebar = function(e) {
        e.stopPropagation();
        $mdSidenav('sidebar').close();
      }

      init();
    }
})();