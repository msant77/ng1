(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('shell-controller', ShellController);


    ShellController.$inject = ['$timeout', '$scope', '$state'];

    function ShellController($timeout, $scope, $state) { 

        //resource to continuing to work with the vm standard in the DOM level
        $scope.vm = {}; //this makes vm appears in the DOM
        var vm = $scope.vm; //this makes it to appear in here

        var init = function initializeController () {

        	vm.title = 'app inicial ng 1';

            // vm.currentUser = currentUser;     
            // if (typeof modalInfo !== undefined) {
            //     if (!isNaN(modalInfo)) {
            //         vm.modalInfo = modalInfo; 
            //     }
            // }
        };

        init(); 

    }
})();