(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteListController', BizClienteListController);

  BizClienteListController.$inject = ['$scope', 'coreModal', 'bizClienteService'];
  /* @ngInject */
  function BizClienteListController($scope, coreModal, bizClienteService) {

    var vm = this;
    vm.title = 'Clientes';
    activate();

    vm.open = function openItem (item) {
        bizClienteService.addView(item); 

        var modal = {
          options : {
            controller : 'BizClienteDetailsController', 
            templateUrl : 'app/biz/cliente/cliente.details.html'
          }, 
          data : item
        };           

        coreModal.subscribe($scope, function (arg1, arg2) {
          console.log('closed with item update'); 
          //console.log()
        });


        var instance = coreModal.show(modal); 

    }

    vm.info = function showInfoDialogBox (item) { 

      coreModal.info("Hello, this is an info box", "Info Box", function () {
        console.log('the ok button from the info box has been clicked'); 
      });

    }

    vm.err = function showInfoDialogBox (item) { 

      coreModal.err("Wow, this is bad. System just popped an error", "Error Box", function () {
        console.log('the Got It button from the error box has been clicked'); 
      });

    }

    vm.delete = function showConfirmationDialogBox (item) { 

      coreModal.confirm(
        "Danger, do you confirm this operation ?", 
        "Confirmation Box", 
        function () {
          console.log('the ok button from the confirmation box has been clicked'); 
        },
        function () {
          console.log('cancel button from the confirmation box has been chosen instead')
        });
    }


    function activate() {
      bizClienteService.getList().then(function (res) {
        vm.list = res; 
      }); 

    }
  }
})();

