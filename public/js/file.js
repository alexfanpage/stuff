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



    //CHART STUFF
    var chart = new Chartist.Line('.ct-chart', {
      labels: ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'],
      series: [
      {
        name: 'Euro',
        data: [4.4252, 4.5252, 4.3952, 4.5152, eurCurrency]
      },
      {
        name: 'Usd',
        data: [3.8932, 3.8632, 3.8232, 3.9232, usdCurrency]
      },
      {
        name: 'Gbp',
        data: [6.0474, 6.1474, 5.9474, 6.0474, gbpCurrency]
      }]
    }, {
      low: 0,
      axisX: {
        offset: 25,
        labelOffset: {
          y: 10
        }
      },
      axisY: {
        offset: 35,
        labelOffset: {
          x: -10,
          y: 3
        }
      }
    });

    var $tooltip = $('<div class="tooltip tooltip-hidden"></div>').appendTo($('.ct-chart'));

    $(document).on('mouseenter', '.ct-point', function() {
      var seriesName = $(this).closest('.ct-series').attr('ct:series-name'),
          value = $(this).attr('ct:value');

      $tooltip.text(seriesName + ': ' + value);
      $tooltip.removeClass('tooltip-hidden');
    });

    $(document).on('mouseleave', '.ct-point', function() {
      $tooltip.addClass('tooltip-hidden');
    });

    $(document).on('mousemove', '.ct-point', function(event) {
      console.log(event);
      $tooltip.css({
        left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
        top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
      });
    });
  }
});
