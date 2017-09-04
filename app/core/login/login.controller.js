(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope','LoginService', '$state', 'coreModal','localdb'];

    function LoginController($scope,LoginService, $state, coreModal,localdb) {
      $scope.vm = {}; //this makes vm appears in the DOM
      var vm = $scope.vm; //this makes it to appear in here  

      vm.loginGoogle = function() {
          var promise = LoginService.loginGoogle();
            promise.then(function(data){
                // console.log(data);
                localdb.set("loggeduser", data);
                $state.go('cliente');
            })
            .catch(function(data){
                console.log(data);
            });
      };
      vm.loginEmail = function(){
        var promise = LoginService.loginEmail(vm.email, vm.password);
        promise.then(function(data){
            localdb.set("loggeduser", data);
            $state.go('cliente');
        })
        .catch(function(data){
            vm.loginForm.password.$setValidity('invalid_password', false);
            coreModal.info(data, "Opa!", function () {
                console.log('the ok button from the info box has been clicked'); 
              });
        });
      }
    }
})();
