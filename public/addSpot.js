// Materialize select drop down functionality
$(document).ready(function() {
  $('select').material_select();
});


// User location use this as reference for finding location
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var coords = pos.coords;

  // auto populate coordinate fields for addSpot
  $('#lat').val(coords.latitude);
  $('#lng').val(coords.longitude);
};

function error(err) {
  console.warn('Error(${err.code}): ${err.message}');
};

navigator.geolocation.getCurrentPosition(success, error, options);
