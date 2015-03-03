var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

userSchema = new Schema({
  id: ObjectId,
  email : { type: String, unique: true},
  password : String,
});


var userModel = mongoose.model('user', userSchema);



module.exports = {
  userModel : userModel
}