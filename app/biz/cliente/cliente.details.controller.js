(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteDetailsController', BizClienteDetailsController);

  BizClienteDetailsController.$inject = [
      '$scope', '$filter', 
      'modalInfo', 
      'coreModal',
      'bizClienteService'
  ];
  /* @ngInject */
  function BizClienteDetailsController($scope, $filter, modalInfo, coreModal, bizClienteService) {

    //resource to continuing to work with the vm standard in the DOM level
    $scope.vm = {}; //this makes vm appears in the DOM
    var vm = $scope.vm; //this makes it to appear in here	 


    vm.rawTitle = 'some title';

    activate();

    function activate() {
      vm.item = modalInfo; 

      vm.title = vm.item.name; 

      vm.close = closeModal;
      // vm.save = saveItem; 
      // vm.refresh = refreshItem; 
    }

    function refreshItem () {
      //do refreshing 
    }

    function saveItem() {
      // var method = entityService.put; 
      // if (vm.isNew) {
      //   method = entityService.post; 
      // }
      // method(
      //   vm.item,
      //   function (res, err) {
      //     if (err) {
      //       logger.error(err); 
      //     }
      //     vm.item = res; 
      //     vm.refresh(); 
      //     modalService.notify();
      //   }
      // );
    }

    function closeModal() {
      bizClienteService.addClose(modalInfo); 
    	modalInfo.update = 5; 
    	coreModal.notify(vm.item); 
      coreModal.close(); 
    }

  }
})();
