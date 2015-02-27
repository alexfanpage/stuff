var chart = new Chartist.Line('.ct-chart', {
  labels: ['Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri'],
  series: [{
    name: 'Euro',
    data: [4.4252, 4.5252, 4.3952, 4.5152, 4.4952]
  } , {
    name: 'Usd',
    data: [3.8932, 3.8632, 3.8232, 3.9232, 3.8232]
  } , {
    name: 'Gbp',
    data: [6.0474, 6.1474, 5.9474, 6.0474, 6.1474]  }]
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

