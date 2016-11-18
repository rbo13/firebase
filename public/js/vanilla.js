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

	var lat = "";
	var lng = "";

	var map = ""

	var markers = [];

	const preObject = document.getElementById('object');
	const ulList = document.getElementById('list');

	const dbRef = firebase.database().ref().child('data');
	const dbRefList = dbRef.child('markers');

	//Synchronize changes.
	dbRef.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(), null, 3);
	});

	//Sync list changes
	dbRefList.on('child_added', snap => {

		markers.push({lat : snap.val().lat, lng : snap.val().lng})

		var ph = { lat: 10.3157, lng: 123.8854};

		

		initMap(lat, lng, ph);

		console.log(lat+" - "+lng);
		console.log(markers);
	});

	// var bigOne = document.getElementById('bigOne');
	// //database reference
	// var dbRef = firebase.database().ref().child('data');
	// dbRef.on('value', snap => console.log(snap.val()));

	function initMap(lat, lng, ph) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lng},
          zoom: 15,
          center: ph
        });

        for(i = 0; i < markers.length; i++){
        	var marker = new google.maps.Marker({
          		position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
          		map: map
        	});
        }
        
    }	

})();