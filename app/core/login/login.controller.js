(function () {
    'use strict';
    angular
        .module('app.core')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', '$state', 'coreModal','localdb'];

    function LoginController(LoginService, $state, coreModal,localdb) {
        var ctrl = this;

        ctrl.login = function() {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
              // console.log("success");
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.accessToken;
              // The signed-in user info.
              var user = result.user;
              var loggeduser = {name:user.displayName,token:token,photo:user.photoURL}

              localdb.set("loggeduser", loggeduser);
              // console.log(loggeduser);
              $state.go('cliente');
              // ...
            }).catch(function(error) {
              // console.log("error");
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // console.log(errorCode);
              // console.log(errorMessage);
              // console.log(email);
              // console.log(credential);
            });
            // var promise = LoginService.login(ctrl.email, ctrl.password);
            // promise.then(function(data){
            //     console.log(data);
            //     $state.go('cliente');
            // })
            // .catch(function(data){
            //     ctrl.loginForm.password.$setValidity('invalid_password', false);
            //     coreModal.info(data, "Opa!", function () {
            //         console.log('the ok button from the info box has been clicked'); 
            //       });
            // });
        };
    }
})();
