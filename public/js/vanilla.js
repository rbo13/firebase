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

	var map = "";

	var ph = {};
	var icons = 'assets/icons/';

	var markers = [];
	var infoWindows = [];

	const preObject = document.getElementById('object');
	const ulList = document.getElementById('list');
	const helloUser = document.getElementById('helloUser');

	//click if the submit pin is selected.
	const createPin = document.getElementById('submitPin');

	var pinTitle = "";
	var pinMessage = "";

	const options = document.querySelector('input[name="options"]:checked').value;

	const dbRef = firebase.database().ref().child('data');
	const dbRefList = dbRef.child('markers');

	//Declare variable to check the firebaseUser.
	var isLoggedIn = null;
	var infoWindow = new google.maps.InfoWindow();
	//Synchronize changes.
	dbRef.on('value', snap => {
		// preObject.innerText = JSON.stringify(snap.val(), null, 3);
	});

	ph = { lat: 10.3157, lng: 123.8854};

	initMap(lat, lng, ph);
	//Sync list changes
	dbRefList.on('child_added', snap => {

		markers.push({
			description: snap.val().description,
			title: snap.val().title,
			type: snap.val().type,
			lat : snap.val().lat,
		 	lng : snap.val().lng
		 })

		for(var i = 0; i < markers.length; i++){
			createMarker(markers[i]);
		}
		


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

		isLoggedIn = firebaseUser;

		if(isLoggedIn){
			console.log(isLoggedIn);
			console.log("Logged in");
			btnLogout.style.display = "block";
			signUp.style.display = "none";
			btnLogout.classList.remove('hide');
			signUp.classList.add('hide');
			// helloUser.innerText = firebaseUser.displayName;
		}else{
			console.log('not logged in');
			signUp.style.display = "block";
			btnLogout.style.display = "none";
			btnLogout.classList.add('hide');
			// helloUser.innerText = "";
		}

	});

	//Perform logout
	btnLogout.addEventListener('click', e => {

		console.log("Logout");
		firebase.auth().signOut();
	});
	
	//create a initialize map and create a new marker.
	function initMap(lat, lng, ph) {

		console.log("Map loaded");

		
  		
  		//Initialize map.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: lat, lng: lng},
          zoom: 15,
          center: ph
        });

        var strictBounds = new google.maps.LatLngBounds(

			new google.maps.LatLng(10.264759, 123.855103),
 			new google.maps.LatLng(10.376059, 123.923081)
  		);

        
        //Set bounds
  		google.maps.event.addListener(map, 'dragend', function(){
  			console.log("Ari rka kutob");

  			if (strictBounds.contains(map.getCenter())) return;

     		// We're out of bounds - Move the map back within the bounds
		     var c = map.getCenter(),
		         x = c.lng(),
		         y = c.lat(),
		         maxX = strictBounds.getNorthEast().lng(),
		         maxY = strictBounds.getNorthEast().lat(),
		         minX = strictBounds.getSouthWest().lng(),
		         minY = strictBounds.getSouthWest().lat();

		     if (x < minX) x = minX;
		     if (x > maxX) x = maxX;
		     if (y < minY) y = minY;
		     if (y > maxY) y = maxY;

     		map.setCenter(new google.maps.LatLng(y, x));
     		
  		});


        // This event listener calls addMarker() when the map is clicked.
        google.maps.event.addListener(map, 'click', event => {

        	if(!isLoggedIn){
        		return
        	}

        	//TODO: show modal.
        	
        		console.log("Show modal");

        		var dialog = document.querySelector('#new-pin');
		      	
	      		dialog.showModal();

	      		createPin.addEventListener('click', e => {

	      			console.log(e);
	      				
	      				var pinTitle = document.getElementById('pinTitle').value;
						var pinMessage = document.getElementById('pinMessage').value;

	      				console.log("The event");
        				console.log("Latitude: " +event.latLng.lat().toFixed(6));
        				console.log("Longitude: "+event.latLng.lng().toFixed(6));
        				console.log("title: "+pinTitle);
        				console.log("description: "+pinMessage);
        				console.log("type: "+options);

			        	dbRefList.push({
			        		lat: event.latLng.lat().toFixed(6),
			        		lng: event.latLng.lng().toFixed(6),
			        		title: pinTitle,
			        		description: pinMessage,
			        		type: options
			        	})

        				addMarker(event.latLng, type, map);
        				dialog.close();

	      			

	      		});

		      	if (! dialog.showModal) {
		        	dialogPolyfill.registerDialog(dialog);
		     	}
			      
		      dialog.querySelector('.close').addEventListener('click', function() {
		        dialog.close();
		      });
        	//end
        	
        	
        });

        
        
    }

    
    //Add a new marker
    function addMarker(location, type, map){
    	// Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
        
        var marker = new google.maps.Marker({
          position: location,
          map: map,
          icon: icons+type+".png",
          animation: google.maps.Animation.DROP
        });

        console.info("The location");
        console.log(location);
    }

    //create a new marker
    function createMarker(m){
 			console.log(icons+m.type+".png")
        	var marker = new google.maps.Marker({
          		position: new google.maps.LatLng(m.lat, m.lng),
          		icon: icons+m.type+".png",
          		map: map
        	});
        	/*infoWindow = new google.maps.InfoWindow({
        		content: m.description
        	})
        	marker.addListener('click', function() {
	          infoWindow.open(map, marker);
	        });*/
              

          console.log(m);
          createInfoWindow(marker, m.description);

    }

    function createInfoWindow(marker, popupContent) {
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(popupContent);
            infoWindow.open(map, this);
        });
    }


})();