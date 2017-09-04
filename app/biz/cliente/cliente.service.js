(function() {
  'use strict';

  angular
    .module('biz.services')
    .factory('bizClienteService', BizClienteService);

  BizClienteService.$inject = ['$http', '$q', 'config', 'localdb'];
  /* @ngInject */
  function BizClienteService($http, $q, config, localdb) {
    var service = {
      add : add, 
      addView : addView, 
      addClose : addClose, 
      // addDismiss : addDismiss, 
      getList: getList,
      getTitleList: getTitleList
    };

    var key = 'cliente-list'; 

    var list = localdb.get(key); 

    return service;

    function add (name,idade) { 
      return $q(function(resolve, reject) {
        var cliente = {
            name : name,
            idade : idade,
            views : 0,
            closed : 0,
            dismissed : 0
          };
        list.push(cliente);  
        resolve(true);
      });      
    }

    function addView (item) { 
      var found = list.find(function(i) {
        return item.name == i.name;
      }); 
      found.views++; 
    }

    function addClose (item) { 
      var found = list.find(function(i) {
        return item.name == i.name;
      }); 
      found.closed++; 
    }


    function getTitleList() { return $q.when('Tela de Listagem de Clientes'); }

    function getList() {

      if (!list) { 
        return getFromAPI();  
      } else {
        return new Promise(function (resolve, reject) {
            resolve(list); 
          }
        ); 
      }

      function getFromAPI () {
        
        return new Promise(function (resolve, reject) {

          var serverList = 
           [
            {
              name : 'Marieta Severo',
              idade : 89,
              views : 0,
              closed : 0,
              dismissed : 0
            }, 
            {
              name : 'Suzanna Vieira', 
              idade : 99, 
              views : 0,
              closed : 0,
              dismissed : 0
            },
            {
              name : 'Graciliane Feijoa', 
              idade : 30,
              views : 0,
              closed : 0,
              dismissed : 0
            }
          ];
          localdb.set(key, serverList); 

          resolve(serverList); 

        }); 
      }
    }
  }
})();
