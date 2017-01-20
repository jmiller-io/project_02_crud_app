console.log('hi from main');
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
// Create the Map and the markers
function initMap() {

  // Create the Map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.154413, lng: -118.120233},
    zoom: 14
  });

  // HTML5 GeoLocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    });
  };

  // Get all the data from the Database
  $.get('/data.json', function( response ) {
    markerData = response;

    // iterate through objects creates map marker
    markerData.forEach(function(obj) {
      var marker = new google.maps.Marker({
        position: obj.coordinates,
        map: map,
      });

       marker.set("editing", true);

      // Create info window with object database info
      var infowindow = new google.maps.InfoWindow({
        content: '<div><i class="material-icons editEntry">mode_edit</i><br><img class="infowindow_img" src="' + obj.imgURL + '"><br /> <p> Description: ' + obj.description + '</p><p>Category: <i>' + obj.category + '</i></p><p>ID: <span class="id">' + obj._id + '</span></p></div>' // in the windo
      });

      // info window event listener
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
