console.log('linked to updateSpots.js')

// Add click event to body for entry updating
$('body').click(function(evt){
  if (evt.target.classList.contains('deleteEntry')) {
    var entryID = $(event.target).next('p').text();
    $.ajax({
      url: '/deleteSpot',
      data: {id: entryID},
      success: function(response) {
        console.log(response)
      },
      error: function (xhr) {
        console.log(xhr)
      }
    });
  } else {
    // Do nothing
  }
});
