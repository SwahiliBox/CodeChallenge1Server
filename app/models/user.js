var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var userSchema=mongoose.Schema({
  local:{
    username:String,
    //email:String,
    password:String
  },
  facebook:{
    id:String,
    token:String,
    email:String,
    name:String
  },
  google : {
        id : String,
        token : String,
        email : String,
        name : String
    }

});
userSchema.methods.generateHash=function(password){
  return bcrypt.hashsync(password,bcrypt.genSaltSync(9));
}
userSchema.methods.validPassword=function(password){
  return bcrypt.compareSync(password, this.local.password);
}
module.exports = mongoose.model('User',userSchema);
