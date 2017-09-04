(function () {
    'use strict';
    angular.module('app.core')
        .service('localdb', LocalDBService);

    LocalDBService.$inject = ['$localStorage', 'config'];
  /* @ngInject */
    function LocalDBService($localStorage, config) {

    	var svc = this; 

      var userHash = "_"; 

      var userProfile = { isLoggedIn : true , username : 'jp'} 

      if (userProfile.isLoggedIn) {
        userHash = userHash + userProfile.username; 
      }

      var getSensitiveKey = function (key) {
        return key + userHash; 
      }

      svc.get = function getDataFromLocalStorage(key, userSensitive) {
        if (userSensitive) {
          key = getSensitiveKey(key); 
        }
        return $localStorage[key]; 
      }

      svc.set = function setDataToLocalStorage(key, value, userSensitive) {
        if (userSensitive) { 
          key = getSensitiveKey(key); 
        }
        $localStorage[key] = value; 
      }

      return svc; 

    }
}());