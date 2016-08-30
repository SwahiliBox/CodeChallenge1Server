var passport      = require('passport');

module.exports = {
  new : function(req, res){
    res.render('session/new', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },

  create : function(req, res, next){
    passport.authenticate('local-login', function(err, user){
      if (err) return next(err);
      if (!user) {
        console.log('user not found');
        return res.redirect('/login');
      }

      req.login(user, function(err){
        if (err) return next(err);
        req.flash('success', "Successfully logged in");
        return res.redirect("/");
        console.log('success');
      });
    })(req, res, next);
  },

  delete : function(req, res){
    req.logout();
    res.redirect('/');
    /* 
     since we're using friendly forwarding (see req.sessio.returnTo) when we 
     logout the (req.session.returnTo variable will still be around, 
     so we need to destroy it 
    */
    req.session.destroy();
  } 
};
