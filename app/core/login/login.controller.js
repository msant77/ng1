(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state', 'coreModal'];

    function LoginController(LoginService, $state, coreModal) {
        var ctrl = this;

        ctrl.login = function() {
            var promise = LoginService.login(ctrl.email, ctrl.password);
            promise.then(function(data){
                console.log(data);
                $state.go('cliente');
            })
            .catch(function(data){
                ctrl.loginForm.password.$setValidity('invalid_password', false);
                coreModal.info(data, "Opa!", function () {
                    console.log('the ok button from the info box has been clicked'); 
                  });
            });
        };
    }
})();
