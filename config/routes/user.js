var express= require('express');
var router=express.Router();
var cors   = require('cors');
var User   = require('../../app/models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

 module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

  app.get('/signup', function(req,res){
    res.render('signup', {
       message: req.flash('signupMessage')
     });
  });


 /*passport.use(new LocalStrategy(
  function(email, password, done) {
  User.getUserByUsername(email, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null,false,{message:'Unknown user'});
    }
    });
  }));
 passport.use(new LocalStrategy({
   EmailField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    // ...
  }
));*/

  //Register user
  app.post('/signup', function(req, res){
    var firstname=req.body.firstname;
    var surname=req.body.surname;
     var username=req.body.username;
     var email=req.body.email;
     var password=req.body.password;

   User.getUserByUsername(username, function(err, user, done){
     var message = 'That username is already taken';
     if(err) throw err;

     if(user){
     res.render('signup', {
       message: message
     });
     } else {
         console.log('You have no register errors');
            var newUser=new User({
              'local.firstname': firstname,
              'local.surname': surname,
              'local.username': username,
              'local.email': email,
              'local.password': password
            });
            User.createUser(newUser,function(err, user){
              if (err) throw err;
              console.log(user);
            });
            message = 'you are registered and now can login';
            res.render('login', {
              message: message
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
            return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            // if the user is found but the password is wrong
          if (!user.validPassword(password))
            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
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
      message: req.flash('loginMessage')
    });
  });

  app.post('/login',
  passport.authenticate('local', {successRedirect:'/insert',failureRedirect:'/login',failureFlash: true}),
    function(req, res) {
      res.redirect('/');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
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
