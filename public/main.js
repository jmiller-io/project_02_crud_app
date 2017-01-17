console.log('hi from main')

  // My coordinates
  //34.154413, -118.120233

  // Database schema
var structures = [
  {Description: 'Home',
   coordinates: {lat: 34.154413, lng: -118.120233},
   imgLocation: 'public/images',
   category: 'bungalow'
  },
  {Description: 'Away',
   coordinates: {lat: 34.1, lng: -118.1},
   imgLocation: 'public/images',
   category: 'bungalow'
  }
];


$.get('/data.json', function( response ) {
  var markerData = JSON.stringify(response);
});




function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.154413, lng: -118.120233},
    zoom: 14
  });


  structures.forEach(function(obj) {
    var marker = new google.maps.Marker({
      position: obj.coordinates,
      map: map,
      title: 'Hello World!' //what displays when mouse over

    });

    var infowindow = new google.maps.InfoWindow({
        content: '<img src="img_uploads/example_bungalow.jpeg"><br /> <p>Beautiful Craftsman Bungalow in Pasadena.</p><p>Category: <i>Bungalow</i></p>' // in the windo
      });

      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });

  })

};
