(function () {
    'use strict';
    angular
        .module('app.core')
        .service('LoginService', LoginService);

    LoginService.$inject = [];

    function LoginService() { 
        this.login = function(name, password) {
            return name && password && password === '123';
        }

        this.logout = function() {
            // return;
        }
    }
})();