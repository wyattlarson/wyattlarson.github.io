// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
            url : "https://api.wunderground.com/api/11fc9ae6852b90d4/geolookup/conditions/q/"+lat+','+long+".json",
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
                $("#cityDisplay").html(location + ", " + state);
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

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
