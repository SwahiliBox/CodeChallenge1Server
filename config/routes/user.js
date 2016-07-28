var router = require('express').Router();
var cors   = require('cors');
var User   = require('../../app/models/user');

module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

  app.get('/signup', function(req, res){
    res.render('signup', {
        message: req.flash('signupMessage') 
    });
  });
  //register user
  app.post('/signup',function(req,res){

    var newUser             = new User();

    newUser.local.name = req.body.name;
    //newUser.local.surname   = req.body.surname;
    newUser.local.email     = req.body.email;
    //newUser.local.username  = req.body.username;
    newUser.local.password  = req.body.password;

    User.findOne({ 'local.name': newUser.local.name }, function(err, user) {
      if (err)
        return err;

      if (user) {
        // if a user is found, prevent sign up
        res.send('1');
      }
      else{
        User.createUser(newUser,function(err,user){
          if (err) throw err;
         res.render('login', {message: req.flash('loginMessage')});
        });
      }
    });
  });

  app.get('/login', function(req, res){
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });

  

  app.post('/login',
    passport.authenticate('user-login',{
        successRedirect:'/index',
        failureRedirect:'/login',
        failureFlash:    true 
  }));

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
