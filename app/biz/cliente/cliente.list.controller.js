(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteListController', BizClienteListController);

  BizClienteListController.$inject = ['coreModal', 'bizClienteService'];
  /* @ngInject */
  function BizClienteListController(coreModal, bizClienteService) {
    var vm = this;
    vm.title = 'Clientes';

    activate();

    function activate() {
      vm.list = bizClienteService.getList(); 
      console.log('Activated Admin View');
    }
  }
})();

