$.getJSON( "https://wyattlarson.github.io/modules/privacy.json", function(json) {
 var info = json.info;
  var links = json.links;
  var refunds = json.refunds;
  var children = json.children;
  var access = json.access;
  var choice = json.choice;
  var contactUs = json.contactUs;
  console.log( json );
  $("#info").html(info);
  $('#links').html(links);
  $('#refunds').html(refunds);
  $("#children").html(children);
  $("#access").html(access);
  $("#choice").html(choice);
  $("#contactUs").html(contactUs);
 });
