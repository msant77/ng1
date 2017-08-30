(function () {
	'use strict';
	angular.module('app.core')
		.service('coreModal', CoreModalService);

	CoreModalService.$inject = ['$rootScope', '$mdDialog', 'config'];
	/* @ngInject */
	function CoreModalService($rootScope, $mdDialog, config) {

		var svc = this;

		svc.subscribe = function(scope, callback) {
			var handler = $rootScope.$on('core-modal-notifying-service-event', callback);
			scope.$on('$destroy', handler);
		};

		svc.notify = function() {
			$rootScope.$emit('core-modal-notifying-service-event');
		};

		svc.close = function toggleModalOff() {
			$mdDialog.hide(alert,'cancel');
			alert = undefined;
		};

		svc.show = function toggleModalOn(obj) {
			var options = obj.options;

			svc.modalInstance = $mdDialog.show({
				templateUrl: options.templateUrl,
				controller: options.controller,
				controllerAs: 'vm',
				locals: {
					modalInfo: obj.data
				}
			});

			return svc.modalInstance; 
		};

		//dialog box operations 
		var showDialog = function toggleModalOn(data) {
      
			data.type = 'dialog'; 

			svc.modalInstance = $mdDialog.show({				
				templateUrl: 'app/core/modal/core.modal.html',
				controller: 'CoreModalController',
				controllerAs: 'vm',
				locals: {
					modalInfo: data
				}
			});

			return svc.modalInstance; 
		};

		svc.info = function showInfoModal (message, title, callback) {
			var data = {
				message : message,
				title : title, 
				icon : 'fa fa-info',
				buttons : [
					{name : 'ok', text : 'Ok', callback : callback, class:'md-raised md-primary'}
				]
			}

			return showDialog(data); 
		}

		svc.confirm = function showConfirmationModal ( message, title, callbackOk, callbackCancel) {
			var data = {
				message : message,
				title : title, 
				icon : 'fa fa-question',
				buttons : [
					{name : 'yes', text : 'yes', callback : callbackOk},
					{name : 'no', text : 'no', callback : callbackCancel}
				]
			}

			return showDialog(data); 

		}

		svc.err = function showErrModal (message, title, callback) {
			var data = {
				message : message,
				title : title, 
				icon : 'fa fa-warning',
				buttons : [
					{name : 'gotit', text : 'Got It!', callback : callback}
				]
			}

			return showDialog(data); 			
		}

	}
}());
