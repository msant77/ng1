(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteListController', BizClienteListController);

  BizClienteListController.$inject = ['bizClienteService'];
  /* @ngInject */
  function BizClienteListController(bizClienteService) {
    var vm = this;
    vm.title = 'Clientes';

    activate();

    function activate() {
      console.log('Activated Admin View');
    }
  }
})();



// app 


    // app.core 

       // core.shell 
       // core.start
       // localdb
       // modal 
       // config (appSettings)
       // routes 

    // app.biz
      // biz.core
      // biz.entity1
      // biz.entity2
      // biz.entiryn 


// med.app
    //app.core
    //biz.med
       