(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state'];

    function LoginController(LoginService, $state) {
        var ctrl = this;

        ctrl.login = function() {
            var promise = LoginService.login(ctrl.name, ctrl.password);
            promise.then(function(data){
                console.log(data);
                $state.go('clientes');
            })
            .catch(function(data){
                ctrl.loginForm.password.$setValidity('invalid_password', false);
                alert(data);               
            });
        };
    }
})();
