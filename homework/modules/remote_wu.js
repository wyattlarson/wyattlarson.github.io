$('#query').keyup(function(){
  // All code will be inside of this block
    var value = $('#query').val();
      var rExp = new RegExp(value, "i");
    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
    console.log(data);
       // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end keyup


// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "https://api.wunderground.com/api/11fc9ae6852b90d4/geolookup/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      var precip = data.current_observation.precip_today_in ;
      var wind = data.current_observation.wind_mph;



      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#city").text(location);
      $("title").html(location + " | Weather Center");
      $(".currentTemp").html(Math.round(temp_f) + '°');
      $("#precipitation").html("Precipitation: " + precip + " inches");
      $("#wind").html("Wind: " + wind + " mph")

      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
    $.ajax({
       url:  "https://api.wunderground.com/api/11fc9ae6852b90d4/forecast/q/"
    + input + ".json", dataType: "jsonp"
    , success: function (temp) {
        console.log(temp);

        var high = temp.forecast.simpleforecast.forecastday["0"].high.fahrenheit;
        var low = temp.forecast.simpleforecast.forecastday["0"].low.fahrenheit;
        $("#high").html("High: " + high);
        $("#low").html("Low: " + low);
    }
    })
}





// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
  $.ajax({

    url: "https://api.wunderground.com/api/11fc9ae6852b90d4/geolookup/conditions/q/"
    + jsonCity + ".json"
    , dataType: "json"
    , success: function (data) {
      console.log(data);
      console.log(data[jsonCity]);
      var zip = data['location']['zip'];
      console.log(zip);
      getData(zip);
       $("#searchResults").fadeOut(250);
    }
  });
});


 $(document).ready( function() {
     $('#send').on('click', getData());
 });


  // A function for changing a string to TitleCase
function toTitleCase(str){
return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
