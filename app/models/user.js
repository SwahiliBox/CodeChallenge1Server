var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');
var userSchema = mongoose.Schema({
    local:{
      username:{
        type: String,
        index: true
      },
      password:{
        type: String
      },
      email:{
        type: String
      },
      firstname:{
        type: String
      },
      surname:{
        type: String
      }
    },
    facebook:{
      id: String,
      token: String,
      email: String,
      name: String
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String
    },
});

userSchema.methods.validPassword = function(password) {
     return bcrypt.compareSync(password, this.local.password);
 };

var User = module.exports = mongoose.model('User',userSchema);

module.exports.createUser = function(newUser,callback){
  bcrypt.genSalt(10,function(err,salt){
    if(err) throw err;
    bcrypt.hash(newUser.local.password,salt,function(err,hash){
      newUser.local.password = hash;
      newUser.local.save(callback);
    });
  });
};

module.exports.getUserByUsername = function(username, callback){
  var query = {'local.username': username};
  User.findOne(query,callback);
};

module.exports.getUserById = function(id,callback){
  User.findById(id,callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch){
    if(err) throw err;
    callback(null, isMatch);
  });
};
