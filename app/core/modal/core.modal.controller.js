(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('CoreModalController', CoreModalController);


    CoreModalController.$inject = ['$timeout', '$scope', '$state', '$uibModalInstance', 'modalInfo',  'config'];

    function CoreModalController($timeout, $scope, $state, $uibModalInstance, modalInfo, currentUser, appSettings) { 

        //resource to continuing to work with the vm standard in the DOM level
        $scope.vm = {}; //this makes vm appears in the DOM
        var vm = $scope.vm; //this makes it to appear in here

        var init = function initializeController () {

            vm.currentUser = currentUser;     
            if (typeof modalInfo !== undefined) {
                if (!isNaN(modalInfo)) {
                    vm.modalInfo = modalInfo; 
                }
            }
        };

        init(); 

        $scope.ok = function () {
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        // closes modal and send view to module defaultView
        $scope.goHome = function () {
          $uibModalInstance.dismiss('cancel');
          $state.go(appSettings.defaultView); 
        }

        vm.cancel = $scope.cancel; 
        vm.ok = $scope.ok; 
        vm.close  = $scope.cancel; 
        vm.goHome = $scope.goHome; 
    }

})();