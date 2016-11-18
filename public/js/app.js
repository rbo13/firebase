(function(){

	// Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCozHi9JquUcogXtE6ltnOxLOv2W3pEpdk",
	    authDomain: "web-quickstart-840b3.firebaseapp.com",
	    databaseURL: "https://web-quickstart-840b3.firebaseio.com",
	    storageBucket: "web-quickstart-840b3.appspot.com",
	    messagingSenderId: "528797120069"
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