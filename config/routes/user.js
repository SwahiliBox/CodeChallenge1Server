var express       = require('express');
var router        = express.Router();
var cors          = require('cors');
var User          = require('../../app/models/user');
var passport      = require('passport');
var LocalStrategy = require('passport-local');

module.exports    = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/signup', function(req,res){
    res.render('signup', {
        message: req.flash('signupMessage'),
        title: "Sign Up"
    });
  });

  //Register user
  app.post('/signup', function(req, res){
    var user             = new User();
    user.local.firstname = req.body.firstname;
    user.local.surname   = req.body.surname;
    user.local.username  = req.body.username;
    user.local.email     = req.body.email;
    user.local.password  = req.body.password;
    user.local.picture   = user.gravatar();

    User.getUserByUsername({username: req.body.username}, function(err, foundUser, done){
      var message = 'That username is already taken';
      if(err) throw err;

      if(foundUser){
        res.render('signup', {
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
  });

  passport.use(new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
  },

  function(req, email, password, done) {
    User.findOne({ 'local.email' :  email }, function(err, user) {

      // if there are any errors, return the error before anything else
      if (err)
        return done(err);

      // if no user is found, return the message
      if (!user)
      // req.flash is the way to set flashdata using connect-flash
        return done(null, false, req.flash('loginMessage', 'No user found.')); 

      // if the user is found but the password is wrong
      if (!user.validPassword(password))

      // create the loginMessage and save it to session as flashdata
        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

      // all is great, return successful user
      return done(null, user);
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });

  app.get('/login', function(req, res){
    res.render('login', {
        message: req.flash('loginMessage'),
        title: "Login Page"
    });
  });

  app.post('/login',
    passport.authenticate('local', { failureRedirect:'/login',failureFlash: true }),
    function(req, res) {
      /* 
       either redirect the user back to the resource he/she was trying to access
       or redirect to admin page after successful login, this means if i was trying 
       to access /insert and was instead redirected to /login because it is a protected
       route, then after i login, redirect me back to /insert not /admin as it was before 
      */
      res.redirect(req.session.returnTo || '/admin');
      delete req.session.returnTo;
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
    /* 
     since we're using friendly forwarding (see req.sessio.returnTo) when we 
     logout the redirect to path will stick around so we need to clear it 
    */
    req.session.destroy();
  });

  //GOOGLE ROUTES
  //route for google authentication and login
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback', passport.authenticate('google', {
        successRedirect: '/profgmail',
        failureRedirect: '/error'
  }));

  // FACEBOOK ROUTES
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {successRedirect: '/proffacebook',
        failureRedirect: '/error'
  }));

  //route for processing local user login
  app.get('/userdata',isLoggedIn, function(req, res) {
    if(req.user){
      res.send( req.user );// get the user out of session and pass to template
    }
    else{
      res.send("Could not stream data to this end... Keep trying though");
    }
  });

  //route for processing showing the profile page
  app.get('/profgmail', isLoggedIn, function(req, res) {
    res.send( req.user );// get the user out of session and pass to template
  });

  app.get('/proffacebook', isLoggedIn, function(req, res) {
    res.send( req.user );
  });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.send('1');
}
