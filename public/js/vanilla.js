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


	//Get login button
	var googleLogin = document.getElementById('login');

	//Do logout
	var btnLogout = document.getElementById('logout');

	var lat = "";
	var lng = "";

	var map = ""

	var markers = [];

	const preObject = document.getElementById('object');
	const ulList = document.getElementById('list');
	const helloUser = document.getElementById('helloUser');

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
		createMarker(markers);

		console.log(lat+" - "+lng);
		console.log(markers);
	});

	//add event listener to map on click.
	// google.maps.event.addListener(map, 'click', event => {
	// 	console.log("Create new marker");
	// 	console.log(event);
	// 	addMarker(event.latLng, map);
	// });

	// var bigOne = document.getElementById('bigOne');
	// //database reference
	// var dbRef = firebase.database().ref().child('data');
	// dbRef.on('value', snap => console.log(snap.val()));

	//function for login.
	googleLogin.addEventListener('click', e => {

		console.log("From vanillajs");
		var provider = new firebase.auth.GoogleAuthProvider();

		provider.addScope('profile');
		provider.addScope('email');

		firebase.auth().signInWithPopup(provider).then(result => console.log(result));

	});

	//Add auth realtime listener.
	firebase.auth().onAuthStateChanged(firebaseUser => {

		if(firebaseUser){
			console.log(firebaseUser);
			btnLogout.style.display = "block";
			signUp.style.display = "none";
			helloUser.innerText = firebaseUser.displayName;
		}else{
			console.log('not logged in');
			signUp.style.display = "block";
			btnLogout.style.display = "none";
			helloUser.innerText = "";
		}

	});

	//Perform logout
	btnLogout.addEventListener('click', e => {

		console.log("Logout");
		firebase.auth().signOut();
	});
	
	//create a initialize map and create a new marker.
	function initMap(lat, lng, ph) {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lng},
          zoom: 15,
          center: ph
        });

        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', event => {
        	console.log("The event");
        	console.log("Latitude: "+event.latLng.lat().toFixed(6));
        	console.log("Longitude: "+event.latLng.lng().toFixed(6));

        	dbRefList.push({
        		lat: event.latLng.lat().toFixed(6),
        		lng: event.latLng.lng().toFixed(6)
        	})

        	addMarker(event.latLng, map);
        });
    }

    //Add a new marker
    function addMarker(location, map){
    	// Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          animation: google.maps.Animation.DROP
        });

        console.info("The location");
        console.log(location);
    }

    //create a new marker
    function createMarker(markers){
    	for(var i = 0; i < markers.length; i++){
        	var marker = new google.maps.Marker({
          		position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
          		map: map
        	});
        }
    }



})();