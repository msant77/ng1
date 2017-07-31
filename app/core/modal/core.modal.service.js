(function () {
	'use strict';
	angular.module('app.core')
		.service('coreModal', CoreModalService);

	CoreModalService.$inject = ['$rootScope', '$interval', '$uibModal', 'config'];
	/* @ngInject */
	function CoreModalService($rootScope, $interval, $uibModal, config) {

		var svc = this;

		svc.subscribe = function(scope, callback) {
			var handler = $rootScope.$on('core-modal-notifying-service-event', callback);
			scope.$on('$destroy', handler);
		};

		svc.notify = function() {
			$rootScope.$emit('core-modal-notifying-service-event');
		};

		svc.close = function toggleModalOff() {
			$uibModal.dismiss('cancel');
		};

		svc.show = function toggleModalOn(obj) {

			var options = obj.options;

			svc.modalInstance = $uibModal.open({
				animation: true,
				templateUrl: options.templateUrl,
				controller: options.controller,
				resolve: {
					modalInfo: function () {
						return obj.data;
					}
				}
			});

			return svc.modalInstance; 
		};

		//dialog box operations 
		var showDialog = function toggleModalOn(data) {

			data.type = 'dialog'; 

			svc.modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/core/modal/core.modal.html',
				controller: 'CoreModalController as vm',
				resolve: {
					modalInfo: function () {
						return data;
					}
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
					{name : 'ok', text : 'Ok', callback : callback}
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
