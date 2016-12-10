 $(function getData(input) {


 $.ajax({
    url: "https://wyattlarson.github.io/modules/pricing.json"
    , dataType: "jsonp"
    , success: function (data) {
     console.log('data');
//      var month = data.pricing.monthly;
//      var bi = data.pricing.biyearly;
//      var yearly = data.pricing.yearly;
//      console.log('month + bi + yearly');
    }
  });
});
