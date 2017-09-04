(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteAddController', BizClienteAddController);

  BizClienteAddController.$inject = ['$scope', 'coreModal', 'bizClienteService','LoginService'];
  /* @ngInject */
  function BizClienteAddController($scope, coreModal, bizClienteService,LoginService) {

    $scope.vm = {}; //this makes vm appears in the DOM
    var vm = $scope.vm; //this makes it to appear in here  
    vm.title = 'Clientes';
    activate();

    vm.save = function(){
    	vm.success = false;
    	var promise = bizClienteService.add(vm.name, vm.age);
    	promise.then(function(data){
    		coreModal.info("Cliente cadastrado","Sucesso!", function () {
		        console.log('the ok button from the info box has been clicked'); 
		      });
    		vm.name = "";
    		vm.age = "";
    	})
    	.catch(function(data){
    		
    	});
    }

    function activate() {
      LoginService.islogged();
      bizClienteService.getList().then(function (res) {
        vm.list = res; 
      });   
      

    }
  }
})();

