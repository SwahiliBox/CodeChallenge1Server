var mongoose    = require('mongoose');
var bcrypt      = require('bcrypt-nodejs');
var adminSchema = mongoose.Schema({
    local: {
      email:    String,
      password: String
    }
});

adminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

adminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Admin', adminSchema);

