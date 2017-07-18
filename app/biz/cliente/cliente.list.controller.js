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

    function activate() {
      vm.list = bizClienteService.getList(); 



      //console.log('Activated Admin View');
    }
  }
})();

