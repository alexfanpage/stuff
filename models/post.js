var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
       


bnrSchema = new Schema({
  name  : { type : String, required: true, trim: true },
  value : { type : Number, required: true, trim: true },  
  date  : { type : Date, required : true, trim:true, default: Date() }
});

var bnrModel = mongoose.model('rateInfo', bnrSchema);	

var findByDate = function(res) {
  bnrModel.find({ }, function(error, data){
    res.end(JSON.stringify(data));  
  });
};

module.exports = {
  findByDate : findByDate,
  bnrModel : bnrModel
}