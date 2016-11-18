(function(){


	angular
		.module('controller.module')
		.controller('MainController', function($scope, $firebaseObject, $firebaseArray){

				const ref = firebase.database().ref().child("data");
				const syncObject = $firebaseObject(ref);
				syncObject.$bindTo($scope, "data");
		});

}());