$(document).ready(function() {
  $('.button-collapse').sideNav();
  $('select').material_select();
});


// Add click event to body for entry updating
$('body').click(function(evt){
  if (evt.target.classList.contains('deleteEntry')) {
    var entryID = $(event.target).next('p').text();
    $.ajax({
      url: '/deleteSpot',
      data: {id: entryID}
    });
    location.reload();
  }

  if (evt.target.id === 'test_btn') {
      let $btn = $(evt.target)
      let $oldImg_fname = $($btn.parent().children()[0]).children().first().attr('src').split('/').pop()
      console.log($oldImg_fname)
  }
});
