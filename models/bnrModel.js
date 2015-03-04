var mongoose = require('mongoose');
var Schema = mongoose.Schema;

bnrSchema = new Schema({
  name  : { type : String, required: true, trim: true },
  value : { type : Number, required: true, trim: true },
  date  : { type : Date, required : true, trim:true, default: Date() }
});

var bnrModel = mongoose.model('rateInfo', bnrSchema);

var findByTodayDate = function(res) {
  var d = new Date();
  d.setHours(0,0,0,0);

  bnrModel.find({"date": {
      $gte: new Date(d.toISOString())
    }}, function(error, data) {
    res.end(JSON.stringify(data));
  });
};

var findAll = function(res) {
  bnrModel.find({}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};

// Euro
var findEurByLastFiveDays = function(res) {
  var d = new Date();
  d.setHours(0,0,0,0);
  d.setDate(d.getDate()-4);

  bnrModel.find({name: 'EUR', "date": {
      $gte: new Date(d.toISOString())
    }}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};

var findEurByTodayDate = function(res) {
  var d = new Date();
  d.setHours(0,0,0,0);

  bnrModel.find({name: 'EUR', "date": {
      $gte: new Date(d.toISOString())
    }}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};

var findAllByCurrency = function(res, currency){
  bnrModel.find({name: currency.toUpperCase()}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};


// USD
var findUsdByTodayDate = function(res) {
  var d = new Date();
  d.setHours(0,0,0,0);

  bnrModel.find({name: 'USD', "date": {
      $gte: new Date(d.toISOString())
    }}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};

var findAllUsd = function(res){
  bnrModel.find({name: 'USD'}, function(err, data) {
    res.end(JSON.stringify(data));
  });
};

module.exports = {
  findEurByTodayDate: findEurByTodayDate,
  findEurByLastFiveDays: findEurByLastFiveDays,
  findUsdByTodayDate: findUsdByTodayDate,
  findAllByCurrency: findAllByCurrency,
  findAllUsd: findAllUsd,
  findAll: findAll,
  findByTodayDate : findByTodayDate,
  bnrModel : bnrModel
}
