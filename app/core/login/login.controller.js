(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state'];

    function LoginController(LoginService, $state) {
        var ctrl = this;

        ctrl.login = function() {
            // @todo promise
            if(LoginService.login(ctrl.name, ctrl.password)) {
                $state.go('dashboard');
            } else {
                ctrl.loginForm.password.$setValidity('invalid_password', false);
            }
        };
    }
})();
