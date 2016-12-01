// Current Location Scripts
$(function () {

  var status = $('#status');

  $('#query').keyup(function(){
  // All code will be inside of this block
      var value = $('#query').val();
      var rExp = new RegExp(value, "i");
    $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
    console.log(data);
       // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val, lat, lon) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
           var lat= (data['RESULTS'][0]['lat']);
        var lon = (data['RESULTS'][0]['lon']);
        console.log(lat +',' + lon);
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
    }); // end getJSON
}); // end keyup

  // Get the data from the wunderground API
  function getData(lat, lon){
    $.ajax({
            url : "https://api.wunderground.com/api/11fc9ae6852b90d4/geolookup/conditions/q/"+lat+','+lon+".json",
            dataType : "jsonp",
            success : function(data) {

                var location = data['location']['city'];
                var temp_f = Math.round(data['current_observation']['temp_f']);
                var weather = data['current_observation']['weather'];
                var feelslike = Math.round(data['current_observation']['feelslike_f']);
                var wind = Math.round(data['current_observation']['wind_mph']);
                var precip = Math.round(data['current_observation']['precip_today_in']);
                var state = data['location']['state'];
                console.log(location + ", " + temp_f + ": " + state);
                $("#city").html(location + ", " + state);
                $("#currentTemp").html(temp_f + "°");
                $("#summary").html(weather);
                $("#feelslike").html("Feels like it is: " + feelslike + "°");
                $("#wind").html("Wind Speed: " + wind + " mph");
                $("#precip").html("Precipitation: " + precip + " inches");
                $("title").html(location + ", " + state + " | Weather Home");
              }



    });
       $("#cover").fadeOut(250);
  };

});
