(function(){


	angular
		.module('controller.module')
		.controller('MainController', function($scope, $firebaseObject, $firebaseArray, $firebaseAuth){

				const ref = firebase.database().ref().child('data');
				const child = ref.child('markers');

				// $scope.marker = $firebaseObject(ref);
				// const syncObject = $firebaseObject(ref);
				// syncObject.$bindTo($scope, "data");
				
				$scope.markers = $firebaseArray(child);


				$scope.addMarker = function(){
					console.log("Add new marker");

					$scope.markers.$add({
						lat: $scope.latMarker,
						lng: $scope.lngMarker
					});
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

}());