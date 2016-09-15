var Role = require("../../app/models/role");
var User = require("../../app/models/user");

module.exports = {
  create : function(req, res){
    var role = new Role();

    role.name = req.params.role

    Role.findOne({name:role.name}, function(err, foundRole){
      if(err) return err;

      if(foundRole){
        res.send("role exists in database");
      }else{
        role.save(function(err, role){
          if(err) return err;
          res.send("Role created successfully");
        });
      }
    });
  },

  assign : function(req, res){
    var user = new User();
    var role = new Role();
    
    User.findOne({ username: req.params.username }, function(err, foundUser){
      if(err) return err;

      if(foundUser){
        console.log(foundUser);
        Role.findOne({ name: req.params.role }, function(err, foundRole){
          if(err) return err;

          if(foundRole){
            user.role = foundRole._id;

            user.update(function(err, user){
              if(err) return err;

              res.send(user);
            });
          }
        });
      }
    });
  }
}
