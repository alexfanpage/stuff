mongoose = require('mongoose')
Schema = mongoose.Schema
ObjectId = Schema.ObjectId

userSchema = new Schema({
  id: ObjectId,
  email : { type: String, unique: true},
  password : String,
})


userModel = mongoose.model('user', userSchema)



module.exports = {
  userModel : userModel
}
