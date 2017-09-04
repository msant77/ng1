(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope','$mdSidenav','$state','localdb'];

    function NavbarController($scope,$mdSidenav,$state,localdb) {
        $scope.vm = {}; //this makes vm appears in the DOM
        var vm = $scope.vm; 

        function init(){
            var user = localdb.get("loggeduser");
            var name = user.name.split(' ');
            vm.name = name[0];
            vm.photo = user.photo;  
          }

        vm.go = function(state) {
            $state.go(state);
          }

        vm.$onInit = function() {
            vm.summary = { show : false }; 
            
        };

        vm.closeSidebar = function(e) {
            e.stopPropagation();
            $mdSidenav('sidebar').close();
        }

        vm.toggleSidebar = function(e) {
            e.stopPropagation();
            $mdSidenav('sidebar').toggle();
        };
        init();
    }
})();