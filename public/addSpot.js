// Materialize select drop down functionality
$(document).ready(function() {
  $('.button-collapse').sideNav();
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


// Date Picker for Built field
 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 250, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });
