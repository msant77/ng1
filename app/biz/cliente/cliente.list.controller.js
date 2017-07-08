(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteListController', BizClienteListController);

  BizClienteListController.$inject = ['coreModal', 'bizClienteService'];
  /* @ngInject */
  function BizClienteListController(logger) {
    var vm = this;
    vm.title = 'Admin';

    activate();

    function activate() {
      logger.info('Activated Admin View');
    }
  }
})();
