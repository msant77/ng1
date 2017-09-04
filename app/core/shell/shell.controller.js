(function () {
    'use strict';
    angular
        .module('core.shell')
        .controller('ShellController', ShellController);


    ShellController.$inject = ['$scope', 'config', '$state'];

    function ShellController($scope, config, $state) { 

        //resource to continuing to work with the vm standard in the DOM level
        $scope.vm = {}; //this makes vm appears in the DOM
        var vm = $scope.vm; //this makes it to appear in here

        var init = function initializeController () {            

        	vm.title = config.title;
            vm.busyMessage = 'shell says system loading'; 

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