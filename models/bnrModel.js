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

module.exports = {
  findAll: findAll,
  findByTodayDate : findByTodayDate,
  bnrModel : bnrModel
}
