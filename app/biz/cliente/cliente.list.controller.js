(function() {
  'use strict';

  angular
    .module('biz.cliente')
    .controller('BizClienteListController', BizClienteListController);

  BizClienteListController.$inject = ['$scope', 'coreModal', 'bizClienteService','LoginService'];
  /* @ngInject */
  function BizClienteListController($scope, coreModal, bizClienteService,LoginService) {

    $scope.vm = {}; //this makes vm appears in the DOM
    var vm = $scope.vm; //this makes it to appear in here  
    vm.title = 'Clientes';
    startGrid();
    vm.selected = [];
    vm.limitOptions = [2, 4, 6];
    
    vm.options = {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true
    };
    
    vm.query = {
      order: 'name',
      limit: 2,
      page: 1
    };

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
      LoginService.islogged();
      bizClienteService.getList().then(function (res) {
        vm.list = res; 
      });   
    }

    function startGrid(){
      
    }

    vm.toggleLimitOptions = function () {
      vm.limitOptions = vm.limitOptions ? undefined : [2,4,6];
    };
    
    vm.getTypes = function () {
      return [];
    };
    
    vm.loadStuff = function () {
      vm.promise = $timeout(function () {
        // loading
      }, 2000);
    }
    
    vm.logItem = function (item) {
      console.log(item.name, 'was selected');
    };
    
    vm.logOrder = function (order) {
      console.log('order: ', order);
    };
    
    vm.logPagination = function (page, limit) {
      console.log('page: ', page);
      console.log('limit: ', limit);
    }
  }
})();

