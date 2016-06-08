var mongoose=require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema=mongoose.Schema({
  google : {
        id : String,
        token : String,
        email : String,
        name : String
    }

});

module.exports = mongoose.model('User',userSchema);
