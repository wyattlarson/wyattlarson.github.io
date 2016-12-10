 $(function() {


   var people = [];

   $.getJSON('pricing.json', function(data) {
       $.each(data.pricing, function(month, bi, year) {
          var month = data.pricing.monthly;
          var bi = data.pricing.biyearly;
          var year = data.pricing.yearly;
     console.log(month + bi + year)
     });

   });

});
