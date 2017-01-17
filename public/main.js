console.log('hi from main')

  // My coordinates
  //34.154413, -118.120233


  // Database schema
// var structures = [
//   {Description: 'Home',
//    coordinates: {lat: 34.154413, lng: -118.120233},
//    imgLocation: 'public/images',
//    category: 'bungalow'
//   },
//   {Description: 'Away',
//    coordinates: {lat: 34.1, lng: -118.1},
//    imgLocation: 'public/images',
//    category: 'bungalow'
//   }
// ];


// User location use this as reference for finding location
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);










function initMap() {

  // Create the Map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.154413, lng: -118.120233},
    zoom: 14
  });

  // Get all the data from the Database
  $.get('/data.json', function( response ) {
    markerData = response;

    // iterate through objects creates map marker
    markerData.forEach(function(obj) {
      var marker = new google.maps.Marker({
        position: obj.coordinates,
        map: map,
        title: 'Hello World!' //what displays when mouse over
      });

      // Create info window with object database info
      var infowindow = new google.maps.InfoWindow({
        content: '<img class="infowindow_img" src="' + obj.imgLocation + '"><br /> <p>' + obj.description + '</p><p>Category: <i>' + obj.category + '</i></p>' // in the windo
      });

      // info window event listener
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
