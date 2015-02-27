(function() {
  $.ajax({
    url: "http://localhost:3000/api/currencies/today",
    dataType: 'json',
    success: function(results){
      var eurName = results[0].name;
      var eurCurrency = results[0].value;

      var usdName = results[1].name;
      var usdCurrency = results[1].value;

      var gbpName = results[2].name;
      var gbpCurrency = results[2].value;

      var currDate = results[0].date;

      $('.name1').append(eurName);
      $('.name2').append(usdName);
      $('.name3').append(gbpName);

      $('.val1').append(eurCurrency + " lei");
      $('.val2').append(usdCurrency + " lei");
      $('.val3').append(gbpCurrency + " lei");

      $('.date').append(currDate);
    }
  });
})();
