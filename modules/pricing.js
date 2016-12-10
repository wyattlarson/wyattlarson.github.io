$.getJSON( "https://wyattlarson.github.io/modules/pricing.json", function(json) {
 var bi = json["biyearly"];
  var month = json["monthly"];
  var year = json["yearly"];
  console.log( json );
  $("#monthlyPrice").html(month);
  $('#bimonth').html(bi);
  $('#year').html(year);
 });
