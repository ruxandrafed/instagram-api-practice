$(function() {

  $('#get_photos_button').on('click', function(event) {

      $.ajax({
          type: "GET",
          dataType: "jsonp",
          cache: false,
          url: "https://api.instagram.com/v1/tags/lighthouse/media/recent?client_id=aff6da24db664c2d99fae748708839d7&access_token=30927509.aff6da2.eee5673b0d90434cb82c7a37fdae4bc5&callback=data",
          success: function(data) {
            generateHTML(data.data);
          }
      });

  });

  function generateHTML(data) {
    var imgDiv = $('#photos');
    imgDiv.append("<img class='active' src='" + data[0].images.standard_resolution.url + "'>");
    for (var i = 1; i < data.length; i++) {
      var image = "<img src='" + data[i].images.standard_resolution.url + "'>";
      imgDiv.append(image);
    };
    setInterval( "slideSwitch()", 1000 );
  }
});

function slideSwitch() {
  var $active = $('div#photos IMG.active');
  var $next = $active.next();
  $next.addClass('active');
  $active.addClass('last-active');

    $next.css({opacity: 0.0})
      .addClass('active')
      .animate({opacity: 1.0}, 1000, function() {
          $active.removeClass('active last-active');
      });
}

