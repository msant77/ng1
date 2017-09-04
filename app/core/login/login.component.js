(function () {
    'use strict';

    angular
        .module('app.core')
        .component('login', LoginComponent())
        .config(LoginConfig);

    function LoginComponent() {
        return {
            templateUrl: './app/core/login/login.html',
            controller: 'LoginController',
            bindings: {}
        };
    }

    LoginConfig.$inject = ['$stateProvider'];

    function LoginConfig($stateProvider) {
        var state = {
            name: 'login',
            url: '/login',
            component: 'login',
            resolve: {}
        };

        $stateProvider.state(state);
    }
})();