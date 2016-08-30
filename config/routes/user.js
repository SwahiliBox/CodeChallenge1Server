var User          = require('../../app/models/user');

module.exports    = {

  new : function(req, res){
    res.render('users/new', {
        message: req.flash('signupMessage'),
        title: "Sign Up"
    });
  },

  create : function(req, res){
    var user             =  new User();
    user.local.firstname =  req.body.firstname;
    user.local.surname   =  req.body.surname;
    user.local.username  =  req.body.username;
    user.local.email     =  req.body.email;
    user.local.password  =  req.body.password;
    user.local.picture   =  user.gravatar();

    User.getUserByUsername({username: req.body.username}, function(err, foundUser, done){
      var message = 'That username is already taken';
      if(err) throw err;

      if(foundUser){
        res.render('users/new', {
            message: message
        });
      } else {
        console.log('You have no register errors');
        User.createUser(user,function(err, user){
          if (err) throw err;

          req.login(user, function(err){
            if (!err){
              res.redirect('/admin');
            } else{
              console.log("there was an error ", err);
            }
          });
        });
      }
    });
  }
};
