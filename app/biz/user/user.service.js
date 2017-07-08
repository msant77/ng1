(function() {
  'use strict';

  angular
    .module('biz.core')
    .factory('bizUserService', BizUserService);

  BizUserService.$inject = ['$http', '$q'];
  /* @ngInject */
  function BizUserService($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
  }
})();
