$.ajax({
  url: "http://localhost:3000/api/currencies/last-five",
  dataType: 'json',
  success: function(results) {
    var currency = [];
    var dates = [];
    var name = [];

    for (var i=0; i < results.length; i++) {
      currency.push(results[i].value);
      dates.push(results[i].date);
      name.push(results[i].name);
    }
   
    //CHART STUFF
    var chart = new Chartist.Line('.ct-chart', {
      labels: dates,
      series: [
      {
        name: 'Euro',
        data: currency
      },
      {
        name: 'Usd',
        data: currency
      },
      {
        name: 'Gbp',
        data: currency
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
      $tooltip.css({
        left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
        top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
      });
    });
  }
});



$.ajax({
   url: 'http://localhost:3000/api/currencies/today',
  dataType: 'json',
  success: function(results) {
    var currency = [];
    var dates = [];
    var name = [];

    for (var i=0; i < results.length; i++) {
      currency.push(results[i].value);
      dates.push(results[i].date);
      name.push(results[i].name);


      $('.name').append(results[i].name + ' ');
      $('.val').append(results[i].value + ' ');
      $('.lei').append('Lei' + '<br>');
      $('.date').append(results[i].date + ' ');
      
      $('ul.dropdown-menu').append('<li><a href="#" id="'+results[i].name+'" data-name="'+results[i].name+'" data-price="'+results[i].value+'">'+results[i].name+'</a></li>');
    
      $('#EUR').on('click', function () {
        var msglist = document.getElementById("EUR");
        var currency = msglist.getAttribute("data-name");
        console.log(currency);
        $.ajax({
          url: 'http://localhost:3000/api/currency/'+currency+'/last-five',
          dataType: 'json',
          success: function(results) {
            var currency = [];
            var dates = [];
            var name = [];

            for (var i=0; i < results.length; i++) {
              currency.push(results[i].value);
              dates.push(results[i].date);
            }
           
          

            //CHART STUFF
            var chart = new Chartist.Line('.ct-chart', {
              labels: dates,
              series: [
              {
                name: results[0].name,
                data: currency
              }]
            }, {
              low: 0,
              axisX: {
                offset: 30,
                labelOffset: {
                  y: 10
                }
              },
              axisY: {
                offset: 35,
                labelOffset: {
                  x: -20,
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
              $tooltip.css({
                left: (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
                top: (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 20
              });
            });
          }
        });
      });
    }
  }
});





