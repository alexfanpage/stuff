var allTheStuff = function(){
  $.ajax({
    url: "http://localhost:3000/api/currencies/last-five",
    dataType: 'json',
    success: function(results) {
      var curatedAPI = [];
      var dataPlot = [];
      var counter = 0;

      for(var i=0; i < results.length; i++) {
        if(typeof curatedAPI[results[i].name] == 'undefined') {
          curatedAPI[results[i].name] = [];
          curatedAPI.length++;
        }
        curatedAPI[results[i].name].push(results[i]);
      }

      for(var index in curatedAPI) {
        dataPlot[counter] = {
          name: curatedAPI[index][0].name,
          data: curatedAPI[index]
        }
        counter++;
      };

      //CHART STUFF
      var chart = new Chartist.Line('.ct-chart', {
        labels: [1,2,3,4,5],
        series: dataPlot
      }, {
        low: 0,
        axisX: {
          offset: 35,
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
};

allTheStuff();
$('#all').click(function(){
  allTheStuff();
});

$.ajax({
   url: 'http://localhost:3000/api/currencies/today',
  dataType: 'json',
  success: function(results) {
    for(var index in results) {
      $('ul.dropdown-menu').append('<li><a href="#" id="'+results[index].name+'" data-name="'+results[index].name+'" data-price="'+results[index].value+'">'+results[index].name+'</a></li>');
    }

    var t = $('#data-table').DataTable();
      for(var index in results) {
        row = results[index];
        t.row.add([
          results[index].name,
          results[index].value,
          results[index].date
         ]).draw();
       }

    $('ul.dropdown-menu li:not(:first-child) a').on('click', function () {
      var currency = this.getAttribute("data-name");

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
});

$.ajax({
    url: "http://localhost:3000/user",
    dataType: 'json',
    success: function(results) {
      console.log(results.email);
      var hash = md5(results.email);
      $('.avatar img').attr('src', 'http://gravatar.com/avatar/' + hash + '?s=30');
      console.log(hash);
   }
})


$(document).ready(function() {
  App.init();
  TableManageDefault.init();
});


