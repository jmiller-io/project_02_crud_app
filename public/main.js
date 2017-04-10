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
    console.log('markerData', markerData)
    // iterate through objects creates map marker
    markerData.forEach(function(obj) {
      var marker = new google.maps.Marker({
        position: obj.coordinates,
        map: map,
      });

       marker.set("editing", true);

      // Create info window with object database info
      var infowindow = new google.maps.InfoWindow({
        content: '<div><img class="mapImg" src="' + obj.imgURL + '"><br /> <p> Description: ' + obj.description + '</p><p>Category: <i>' + obj.category + '</i></p></div>' // in the windo
      });

      // info window event listener
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });

      // create Gallery view
      let $div = $('<div>');
      $div.addClass('row');
      $div.html(`<div class="col s12 m6">
      <div class="card">
        <div class="card-image">
          <img src="${obj.imgURL}">
        </div>
        <div class="card-content">
          <p><span class="headings">Description: </span> ${obj.description}</p>
          <p><span class="headings">Category: </span> ${obj.category}</p>
          <p><span class="headings">Location: </span> ${obj.coordinates.lat},  ${obj.coordinates.lng}</p>
        </div>
      </div>
    </div>`)
    $('div#gallery').append($div)


    });
  });
  $('div#gallery').hide();
};

// Show gallery
$('#gallery_btn').click(function(event) {
  $('div#map').hide();
  $('div#gallery').show();
});

// Show Map
$('#map_btn').click(function(event) {
  $('div#gallery').hide()
  $('div#map').show();
});

$(document).ready( function() {
  $('.button-collapse').sideNav();
})
