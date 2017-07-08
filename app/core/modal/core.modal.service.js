(function () {
	'use strict';
	angular.module('app.core')
		.service('coreModalService', CoreModalService);

	CoreModalService.$inject = ['$rootScope', '$interval', '$uibModal', 'appSettings'];
	/* @ngInject */
	function CoreModalService($rootScope, $interval, $uibModal, appSettings) {

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
		};
	}
}());
