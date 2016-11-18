(function(){


	angular
		.module('controller.module')
		.factory('firebaseDataService', firebaseDataService)
		.controller('MainController', function($scope, $window, $firebaseObject, $firebaseArray, $firebaseAuth, firebaseDataService){

				//Reference to firebase database.
				const ref = firebase.database().ref().child('data');
				const child = ref.child('markers');


				$scope.allItems = $firebaseObject(ref);
							
				// $scope.marker = $firebaseObject(ref);
				// const syncObject = $firebaseObject(ref);
				// syncObject.$bindTo($scope, "data");
				
				$scope.markers = $firebaseArray(child);

				// console.log(firebaseDataService);

				$scope.addMarker = function(){
					console.log("Add new marker");

					$scope.markers.$add({
						lat: $scope.latMarker,
						lng: $scope.lngMarker
					});

					$window.localStorage.setItem('lat', $scope.latMarker);
					$window.localStorage.setItem('lng', $scope.lngMarker);
				};

				//authenticate using google signin
				$scope.loginWithGoogle = function(authMethod){

					$firebaseAuth().$signInWithPopup(authMethod).then(function(authData){
						console.log(authData);
					}).catch(function(error){
						console.error(error);
					});
				}
		});

		firebaseDataService.$inject = ['$firebaseObject'];

		//firebaseDataService
		function firebaseDataService($firebaseObject){

			const ref = firebase.database().ref().child('data');
			const child = ref.child('markers');

			var object = $firebaseObject(ref);

			return object;

		}

}());