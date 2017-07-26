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
                vm.modalInfo = modalInfo; 

                if (modalInfo.type = 'dialog') { 
                  initDialog(); 
                }
            }
        };

        var initDialog = function initializeDialogBox() { 
          var buttons = [
            {name : 'ok', class : 'btn btn-info', icon : 'fa fa-info', text : 'ok', callback : undefined}, 
            {name : 'cancel', class : 'btn btn-default', icon : 'fa fa-sign-out', text : 'cancel', callback : undefined},            
            {name : 'warning', class : 'btn btn-warning', icon : 'fa fa-warning', text : 'warning', callback : undefined},
            {name : 'danger', class : 'btn btn-danger', icon : 'fa fa-skull', text : 'warning', callback : undefined},
            {name : 'yes', class : 'btn btn-success', icon : 'fa fa-thumbs-up', text : 'yes', callback : undefined},
            {name : 'no', class : 'btn', icon : 'fa fa-thumbs-down', text : 'no', callback : undefined}
          ]

          var chosen = vm.modalInfo.buttons; 
          vm.title = vm.modalInfo.title;
          vm.message = vm.modalInfo.message;

          vm.buttons = 
            chosen.map(button => {
              var template = buttons.find(btn => btn.name === button.name); 

              button.class = template.class; 
              button.icon = template.icon; 

              return button; 
            }); 
        }

        init(); 

        vm.buttonClick = function(button) { 
          button.callback(); 
          $uibModalInstance.close(); 
        }

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