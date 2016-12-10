var passport   =  require('passport');

module.exports =  {
  new : function(req, res){
    res.render('session/new', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  },

  create : function(req, res, next){
        passport.authenticate('user-login', function(err, user){
      if (err) return next(err);
      if (!user) {
        console.log('user not found');
        return res.redirect('/login');
      }
      req.login(user, function(err){
        if (err) return next(err);
        /* 
         either redirect the user back to the resource he/she was trying to access
         or redirect to admin page after successful login, this means if i was trying 
         to access /insert and was instead redirected to /login because it is a protected
         route, then after i login, redirect me back to /insert not /admin as it was before 
         */
         req.flash('success', "Successfully logged in");
         console.log(req.user);
         res.redirect(req.session.returnTo || '/admin');
         delete req.session.returnTo;
      });
    })(req, res, next);
  },

  //User login for the phone application
  usercreate : function(req, res,next){
    passport.authenticate('user-login', function(err,user){
      console.log(user);
      if(err) return err;
      if(!user){
        console.log("not a user");
        res.send("1");
      }else{
      console.log(user);
      res.send(user);
      }
    })(req, res, next);;
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
