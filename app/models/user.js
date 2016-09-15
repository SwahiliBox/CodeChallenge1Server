var mongoose   = require('mongoose');
var bcrypt     = require('bcryptjs');
var crypto     = require('crypto');
var Schema     = mongoose.Schema;
var Role       = require('../../app/models/role');

var UserSchema = Schema({
    local:  {
      username: { type: String, index: true },
      password: { type: String },
      email:    { type: String },
      firstname:{ type: String },
      surname:  { type: String },
      picture:  { type: String, default: '' },
      role:     [{type: Schema.Types.ObjectId, ref:Role }]
    },
    facebook:{
      id:     String,
      token:  String,
      email:  String,
      name:   String
    },
    google: {
      id:     String,
      token:  String,
      email:  String,
      name:   String
    } 
});

UserSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.gravatar = function(size){
  if (!this.size) size = 200;
  if (!this.local.email) return 'https://gravatar.com/avatar/?s' + size + '$d=retro';
  var md5 = crypto.createHash('md5').update(this.local.email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

var User = module.exports = mongoose.model('User',UserSchema);

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
  User.findOne(username,callback);
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
