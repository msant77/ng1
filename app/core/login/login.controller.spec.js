describe('login.controller', function () {

	// declare test variables
	var LoginController, LoginService, coreModal;
	var $controller, $rootScope, $state, $q, scope, localdb, config, deferred;

	beforeEach(function() {
		module('core.start');

		module(function($provide){

			var data = readJSON('app/core/start/settings.json');

			$provide.constant('config', data.config);
			$provide.constant('appRoutes', data.routes);
		});
	});

	beforeEach(module('app.core'));

	// mock services
	beforeEach(module(function($provide) {
		$provide.service('LoginService', function() {
			return {
				loginGoogle: function() {},
				loginEmail: function() {}
			};
		});

		$provide.factory('localdb', function() {
			return {
				get: function () {},
				set: function () {}
			};
		});

		$provide.factory('coreModal', function () {
			return {
				info: function () {}
			}
		});

		$provide.factory('$state', function () {
			return {
				go: function () {}
			}
		});
	}));

	beforeEach(inject(function ($controller, _$rootScope_, _LoginService_, _localdb_, _$q_, _coreModal_, _$state_) {

		// unwrap dependencies
		$rootScope = _$rootScope_;
		coreModal = _coreModal_;
		LoginService = _LoginService_;
		localdb = _localdb_;
		$q = _$q_;
		$state = _$state_;

		// create the new scope
		scope = $rootScope.$new();

		// Instantiante the controller
		LoginController = $controller('LoginController', {
			$scope: scope,
			LoginService: LoginService,
			$state: $state,
			coreModal: coreModal,
			localdb: localdb
		});

		// mock loginForm
		scope.vm.loginForm = {
			password: {
				$setValidity: function() {}
			}
		}

		// required plumbing to test $q promises
		deferred = $q.defer();
		spyOn(LoginService, 'loginGoogle').and.returnValue(deferred.promise);
		spyOn(LoginService, 'loginEmail').and.returnValue(deferred.promise);
		spyOn(localdb, 'set').and.callThrough();
	}));

	it('should exist', function() {
		expect(LoginController).toBeDefined();
	});

	describe('.loginGoogle', function() {
		it('should exist', function() {
			expect(scope.vm.loginGoogle).toBeDefined();
		});

		it('should call the LoginService and then localdb after a successful login', function() {

			scope.vm.loginGoogle();
			deferred.resolve('Successful google login');

			$rootScope.$digest();

			expect(LoginService.loginGoogle).toHaveBeenCalled();
			expect(localdb.set).toHaveBeenCalled();
		});

		it('should call the LoginService but not call localdb after a failing login', function() {

			deferred.reject('Failing google login');
			
			// call the function to be tested
			scope.vm.loginGoogle();

			// resolve the promise
			$rootScope.$digest();

			expect(LoginService.loginGoogle).toHaveBeenCalled();
			expect(localdb.set).not.toHaveBeenCalled();
		});
	});

	describe('.loginEmail', function() {
		it('should call the LoginService and then localdb after a successful login', function() {

			deferred.resolve('Successful email login');
			spyOn(scope.vm.loginForm.password, '$setValidity');
			
			// call the function to be tested
			scope.vm.loginEmail();

			// resolve the promise
			$rootScope.$digest();

			expect(LoginService.loginEmail).toHaveBeenCalled();
			expect(localdb.set).toHaveBeenCalled();
			expect(scope.vm.loginForm.password.$setValidity).not.toHaveBeenCalled();
		});

		it('should call the LoginService but not call localdb after a failing login', function() {

			deferred.reject('Failing email login');
			
			spyOn(scope.vm.loginForm.password, '$setValidity');
			spyOn(coreModal, 'info').and.callThrough();
			
			// call the function to be tested
			scope.vm.loginEmail();

			// resolve the promise
			$rootScope.$digest();

			expect(LoginService.loginEmail).toHaveBeenCalled();
			expect(localdb.set).not.toHaveBeenCalled();
			expect(scope.vm.loginForm.password.$setValidity).toHaveBeenCalled();
			expect(coreModal.info).toHaveBeenCalled();
		});
	});
});
