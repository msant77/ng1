(function() {
  'use strict';

  angular
    .module('biz.services')
    .factory('bizClienteService', BizClienteService);

  BizClienteService.$inject = ['$http', '$q', 'config'];
  /* @ngInject */
  function BizClienteService($http, $q, config) {
    var service = {
      getList: getList,
      getTitleList: getTitleList
    };

    return service;

    function getTitleList() { return $q.when('Tela de Listagem de Clientes'); }

    function getList() {

      return [
        {
          name : 'Marieta Severo',
          idade : 89
        }, 
        {
          name : 'Suzanna Vieira', 
          idade : 99
        },
        {
          name : 'Graciliane Feijoa', 
          idade : 30
        }
      ];
    }
  }
})();
