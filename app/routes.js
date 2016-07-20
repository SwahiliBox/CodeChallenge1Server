var express=require('express');
var cors=require('cors');
var router=express.Router();
var User = require('./models/user');
var Events = require('./models/event');
var Rsvp = require('./models/rsvp');
var Admin = require('../app/models/admin');

module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

  app.get('/error',function(req,res){
    res.send('1');
  });

  /* home route  */
  app.get('/', function(req, res){
    res.render('index');
  });

  app.get('/secure', function(req, res){
    res.render('secure');
  });

  //register user
  app.post('/register',function(req,res){
    var firstname = req.body.firstname;
    var surname   = req.body.surname;
    //var name    = req.body.name;
    var email     = req.body.email;
    var username  = req.body.username;
    var password  = req.body.password;
    var password2 = req.body.password2;

    //newuser object oriented variable assigning
    var newUser             = new User();
    newUser.local.firstname = firstname;
    newUser.local.surname   = surname;
    newUser.local.email     = email;
    newUser.local.username  = username;
    newUser.local.password  = password;

    User.findOne({ 'local.username': newUser.local.username }, function(err, user) {
      if (err)
        return err;

      if (user) {
        // if a user is found, prevent sign up
        res.send('1');
      }
      else{
        User.createUser(newUser,function(err,user){
          if (err) throw err;
          console.log(user);
          res.send(user);
        });
      }
    });
  });

  app.get('/login', function(req, res){
    res.render('login');
  });

  app.post('/login',
    passport.authenticate('user-login',{
        successRedirect:'/userdata',
        failureRedirect:'/error'
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

  //Send file crud.html
  app.get('/crud', function(request, response){
    response.sendFile('crud.html', {'root': 'views'});
  });

  //send events to frontend
  app.get('/events', function(req, res){
    Events.find({}, function(error, events){
      if(error)
        res.send(error)
      res.json(events)
    });
  });

  //admin signup via ejs view
  app.get('/adminsignup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  //admin details saved to database
  app.post('/adminsignup', passport.authenticate('admin-signup', {
        successRedirect: '/adminlogin',
        failureRedirect: '/adminsignup',
        failureFlash:     true
  }));

  //admin login render ejs
  app.get('/adminlogin', function(req, res) {
    res.render('login.ejs', { message: req.flash('signupMessage') });
  });

  //admin details saved to database
  app.post('/adminlogin', passport.authenticate('admin-login', {
        successRedirect: '/eventsrecords',
        failureRedirect: '/adminlogin',
        failureFlash: true 
  }));

  //Crud Page.
  app.get('/eventsrecords', adminLoggedIn,function(req,res){
    res.sendFile('eventsrecords.html', {'root': 'views'});
  });

  //send events to frontend
  app.get('/event',adminLoggedIn, function(req, res){
    Event.find({}, function(err, event){
      if(err)
        res.send(err)
      res.json(event)
    });
  });

  //insert values into mongo db
  app.post('/insert', function(req, res){
    Events.create({
        title: req.body.title,
        venue: req.body.venue,
        date:  req.body.date,
        time:  req.body.time,
        desc:  req.body.desc
    },
    function(err, event){
      if(err)
        res.send(err)

      Events.find({}, function(err, event){
        if(err)
          res.send(err);
        res.redirect('eventsrecords.html');
      });
    });
  });

  //Deleting events data from collection.
  app.post('/delete', function(req, res){
    Events.remove({ _id: req.body.id}, function(err, event){
      if(err)
        res.send(err)
      Event.find({}, function(err, event){
        if(err)
          res.send(err);
        res.redirect('eventsrecords.html');
      });
    });
  });

  //Updating events data in collection.
  app.post('/update', function(req, res){
    var terms = {
      title: req.body.title,
      venue: req.body.venue,
      date:  req.body.date,
      desc:  req.body.desc,
      time:  req.body.time
    }
    Events.update({_id : req.body.id}, {$set: terms}, function(error, event){
      //if(err)
      //res.send(err);
      Event.find({}, function(err, event){
        if(err)
          res.send(err);
        console.log(terms);
        res.redirect('eventsrecords.html');
      });
    });
  });

  app.post('/rsvp', function(req,res){
    Rsvp.create({
        firstname:    req.body.firstname,
        lastname:     req.body.lastname,
        phonenumber:  req.body.phonenumber,
        eventname:    req.body.eventname
    }, function(error,rsvp){
      if(error) console.log(error);
      console.log(rsvp);
      console.log("successful insert");
      res.send('success:' + rsvp);
    });
  });

  app.get('/rsvp', function(req, res){
    Rsvp.find({}, function(err, rsvp){
      if(err)
        res.send(err);
      res.json(rsvp);
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/adminlogin');
  });
  };

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.send('1');
  }
  function adminLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.redirect('/adminlogin');
  }
