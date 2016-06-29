var express=require('express');
var router=express.Router();
var User = require('./models/user');
var Events = require('./models/event');
var Rsvp = require('./models/rsvp');

<<<<<<< HEAD
=======
var express= require('express');
//var router=express.Router();
//var User = require('../app/models/user');
var Admin = require('../app/models/admin');
var Event = require('../app/models/event');
>>>>>>> cecb507236da60d32fb717859405923ec3d1238f

module.exports=function(app,passport){

    app.get('/error',function(req,res){
      res.send('1');
    });

    //register user
    app.post('/register',function(req,res){
      var firstname=req.body.firstname;
      var surname=req.body.surname;
      //var name=req.body.name;
      var email=req.body.email;
      var username=req.body.username;
      var password=req.body.password;
      var password2=req.body.password2;
      
      //newuser object oriented variable assigning
      var newUser=new User();
        newUser.local.firstname =firstname;
        newUser.local.surname   =surname;
        newUser.local.email     =email;
        newUser.local.username  =username;
        newUser.local.password  =password;

      User.findOne({ 'local.username' : newUser.local.username }, function(err, user) {
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

    app.post('/login',
        passport.authenticate('local',{
          successRedirect:'/userdata',
          failureRedirect:'/error'
        }));

    //GOOGLE ROUTES
    //route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
                    successRedirect : '/profgmail',
                    failureRedirect : '/error'
            }));


    // FACEBOOK ROUTES
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {successRedirect : '/proffacebook',
                                           failureRedirect : '/error'
        }));


    //route for processing local user login
    app.get('/userdata', isLoggedIn, function(req, res) {
        res.send( req.user );// get the user out of session and pass to template
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
        response.sendFile('crud.html', {'root' : 'views'});
    });

    //send events to frontend
    app.get('/events', function(req, res){
    	Events.find({}, function(error, events){
    		if(error)
    			res.send(error)
    		res.json(events)
    	});
    });

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/login',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    //Crud Page.
    app.get('/eventsrecords',isLoggedIn, function(req,res){
      res.sendFile('eventsrecords.html', {'root' : 'views'});
    });

    //send events to frontend
    app.get('/event', function(req, res){
      Event.find({}, function(err, event){
        if(err)
          res.send(err)
        res.json(event)
       });
    });

    //insert values into mongo db
    app.post('/insert', function(req, res){
<<<<<<< HEAD
        Events.create({

          title : req.body.title,
          venue : req.body.venue,
          date : req.body.date,
          time : req.body.time,
          desc : req.body.desc
=======
        Event.create({
           title : req.body.title,
           venue : req.body.venue,
           date : req.body.date,
           desc : req.body.desc,
           time : req.body.time
>>>>>>> cecb507236da60d32fb717859405923ec3d1238f
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

       Events.remove({ _id : req.body.id}, function(err, event){
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
           title : req.body.title,
           venue : req.body.venue,
           date : req.body.date,
           desc : req.body.desc,
           time : req.body.time
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
          firstname : req.body.firstname,
          lastname : req.body.lastname,
          phonenumber : req.body.phonenumber,
          eventname : req.body.eventname
        }, function(error,rsvp){
          if(error)
            console.log(error);

          console.log(rsvp);
          console.log("successful insert");

          res.send('success:' + rsvp);
        });
    });
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


  };


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send('Authentication unsuccessful');

    res.redirect('/error');
}

