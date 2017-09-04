(function () {
    'use strict';

    angular
        .module('app.core')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$firebaseAuth','localdb','$q', '$window', 'config'];

    function LoginService($firebaseAuth, localdb, $q,$window, config) { 
        
        this.loginGoogle = function() {
            return $q(function(resolve, reject){
                var provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                  var token = result.credential.accessToken;
                  var user = result.user;
                  var loggeduser = {name:user.displayName,token:token,photo:user.photoURL}
                  resolve(loggeduser);
                }).catch(function(error) {
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  var email = error.email;
                  var credential = error.credential;
                  reject(error);
                });
            });
        }

        this.loginEmail = function(email, password) {
            var auth = $firebaseAuth();
            return $q(function(resolve, reject){
                auth.$signInWithEmailAndPassword(email, password).then(function(firebaseUser) {
                  var loggeduser = {name:"guest",token:firebaseUser.uid,photo:config.urlimg+"/images/profile.jpeg"}
                  resolve(loggeduser);
                }).catch(function(error) {
                    if(error.code == "auth/user-not-found"){
                        auth.$createUserWithEmailAndPassword(email,password)
                          .then(function(firebaseUser) {                            
                            var loggeduser = {name:"guest",token:firebaseUser.uid,photo:config.urlimg+"/images/profile.jpeg"}
                            resolve(loggeduser);
                          }).catch(function(error) {
                            console.error("Error: ", error);
                            reject(error.message);
                          });
                    }else{
                        console.error("Authentication failed:", error); 
                        reject(error.message);
                    }                    
                });
            });
        }

        this.logout = function() {
            localdb.set("loggeduser", "");
        }

        this.islogged = function() {
            var loggeduser = localdb.get("loggeduser");
            if(loggeduser && loggeduser != ""){
                return true;
            }else{
                $window.location.href = "/";
            }
            
        }
    }
})();