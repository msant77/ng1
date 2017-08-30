(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$mdSidenav'];

    function NavbarController($mdSidenav) {
        var ctrl = this;

        ctrl.$onInit = function() {
            ctrl.summary = { show : false }; 
            
        };

        ctrl.closeSidebar = function(e) {
            e.stopPropagation();
            $mdSidenav('sidebar').close();
        }

        ctrl.toggleSidebar = function(e) {
            e.stopPropagation();
            $mdSidenav('sidebar').toggle();
        };

    }
})();