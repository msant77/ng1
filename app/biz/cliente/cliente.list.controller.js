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
            controller : 'BizClienteDetailsController as vm', 
            templateUrl : 'app/biz/cliente/cliente.details.html'
          }, 
          data : item
        };           

      coreModal.subscribe($scope, function (arg1, arg2) {
        console.log('closed with item update'); 
        //console.log()
      });


      var instance = coreModal.show(modal); 

       instance.result.then(function(){
        //Get triggers when modal is closed
        console.log('modal closed');
        //never triggers        
       }, function(){
        console.log('modal dismissed');
        console.log(item);
        //gets triggers when modal is dismissed.
       });
    }

    vm.info = function showInfoDialogBox (item) { 

      coreModal.info("Hello, this is an info box", "Info Box", function () {
        console.log('the ok button from the info box has been clicked'); 
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

