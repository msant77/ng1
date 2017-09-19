describe('login.service', function () {

  // declare globals
  var LoginService;
  var $q, $state, $firebaseAuth, localdb, config, $rootScope;

  // mock data
  var userA = {
    displayName: 'John Doe',
    photoUrl: 'http://mockphoto.com/john-doe.jpg',
    email: 'johndoe@firebase.com',
    password: '123',
    uid: 'john-doe-uid',
    credentials: { accessToken: '123abc' }
  };

  var userB = {
    displayName: 'Jane Doe',
    photoUrl: 'http://mockphoto.com/jane-doe.jpg',
    email: 'janedoe@firebase.com',
    password: '123',
    uid: 'jane-doe-uid'
  }

  var invalidPasswordResponse = {
    code: 'auth/wrong-password',
    message: 'mock message: invalid password',
    email: userA.email,
    credential: {}
  };

  var userNotFoundResponse = {
    code: 'auth/user-not-found',
    message: 'user not found, create a new user',
    email: userB.email,
    credential: {}
  };

	beforeEach(function () {
		module('firebase');
		module(function($provide){
			$provide.value('$firebaseAuth', function() {

				function $signInWithPopup(provider) {
					return $q(function mockResolveGoogle(resolve, reject) {
						resolve({
							user: userA,
							credential: userA.credentials
						});
					});
				}

				function $signInWithEmailAndPassword(email, password) {
					if (email === userA.email) {
						if (password === userA.password) {

							// email and password correct
							return $q( function resolveEmail(resolve, reject) {
								resolve({
									uid: userA.uid
								});
							});
						} else {

							// wrong password
							return $q(function mockRejectEmail(resolve, reject) {
								reject(invalidPasswordResponse);
							});
						}
					} else {

						// wrong email (new user)
						return $q(function mockRejectUnregisteredEmail(resolve, reject) {
							reject(userNotFoundResponse);
						});
					}
				}

				function $createUserWithEmailAndPassword(email, password) {
					return $q(function mockResolveNewEmail(resolve, reject) {
						resolve({
							uid: userB.uid
						});
					});
				}

				return {
					$signInWithPopup: $signInWithPopup,
					$signInWithEmailAndPassword: $signInWithEmailAndPassword,
					$createUserWithEmailAndPassword: $createUserWithEmailAndPassword
				};
			});
		});
	});

	beforeEach(function() {
		module('core.start');

		module(function($provide){

			var data = readJSON('app/core/start/settings.json');

			$provide.constant('config', data.config);
			$provide.constant('appRoutes', data.routes);

		});

		module('app.core');

		module(function ($provide) {
			$provide.factory('localdb', function($localStorage, config) {
				var mockValue = 'mock-value';
				function get(key, userSensitive) {
					return mockValue;
				}
				function set(key, value, userSensitive) {
					mockValue = value;
				}
				return{
					get: get,
					set: set
				};
			});
		});
	});

	beforeEach(inject(function(_LoginService_, _$firebaseAuth_, _localdb_, _$q_, _$state_, _config_, _$rootScope_) {
		LoginService = _LoginService_;
		$firebaseAuth = _$firebaseAuth_;
		localdb = _localdb_;
		$q = _$q_;
		$state = _$state_;
		config = _config_;
		$rootScope = _$rootScope_;
	}));

	it('should work', function() {
		expect(LoginService).toBeDefined();
	});

	describe('.loginGoogle', function() {
		it('should be able to resolve', function() {
			var promise = LoginService.loginGoogle();

			promise.then(
				function(response) {
					expect(response.name).toEqual(userA.displayName);
				});

			$rootScope.$digest();
		});
	});

	describe('.loginEmail', function() {
		it('should be able to resolve', function() {
			var promise = LoginService.loginEmail(userA.email, userA.password);

			promise.then(
				function(response) {
					expect(response.name).toEqual('guest');
				});

			$rootScope.$digest();
		});

		it('should be able to reject', function() {
			var promise = LoginService.loginEmail(userA.email, 'wrong-password');

			promise
				.then(function (response) {
					expect(false).toEqual(true);
				})
				.catch(
					function(error) {
						expect(error).toBe('mock message: invalid password');
					});

			$rootScope.$digest();
		});

		it('should be able to create a new user', function() {
			var promise = LoginService.loginEmail(userB.email, userB.password);

			promise
				.then(function (response) {
					expect(response.token).toEqual('jane-doe-uid');
				})
				.catch(function () {
					expect(false).toEqual(true);
				});
			$rootScope.$digest();
		});
	});

	describe('.logout', function() {

		it('should exist', function() {
			expect(LoginService.logout).toBeDefined();
		});

		it('should call localdb.set', function() {
			spyOn(LoginService, 'logout').and.callThrough();

			expect(localdb.get()).toEqual('mock-value');

			LoginService.logout();
			expect(LoginService.logout).toHaveBeenCalled();
			expect(localdb.get()).toEqual('');
		});
	});

	describe('.islogged', function() {

		it('should exist', function() {
			expect(LoginService.islogged).toBeDefined();
		});

		it('should respond to mocked localdb data changes', function () {
			expect(LoginService.islogged()).toEqual(true);

			LoginService.logout();
			expect(LoginService.islogged()).toEqual(undefined);
		});
	})
});
