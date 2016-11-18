(function(){

	// Initialize Firebase
	  var config = {
		   apiKey: "AIzaSyDdOFLMpJvyMz4eyUCnUjBBYH-kSxBOwT0",
		   authDomain: "testing-a7506.firebaseapp.com",
		   databaseURL: "https://testing-a7506.firebaseio.com",
		   storageBucket: "testing-a7506.appspot.com",
		   messagingSenderId: "193985317879"
	};

	firebase.initializeApp(config);

	angular
		.module('app', ['firebase'])
 		.controller('MainController', function($scope, $firebaseObject, $firebaseArray){
 
 			const ref = firebase.database().ref().child("data");
 
 			const syncObject = $firebaseObject(ref);
 			syncObject.$bindTo($scope, "data");
 		});
	
}());