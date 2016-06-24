
var express= require('express');
//var router=express.Router();
var User = require('../app/models/user');
var Event = require('../app/models/event');

module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
      app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/eventsrecords',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/login',
          failureRedirect : '/signup',
          failureFlash : true
    }));

    //Crud Page.
    app.get('/eventsrecords',function(req,res){
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
        Event.create({
          title : req.body.title,
          venue : req.body.venue,
          date : req.body.date,
          time : req.body.time,
          desc : req.body.description
          //rsvp : req.body.rsvp
        },
        function(err, event){
           if(err)
              res.send(err)

           Event.find({}, function(err, event){
              if(err)
                  res.send(err);

              res.redirect('eventsrecords.html');
           });
        });
    });

    //Deleting events data from collection.
    app.post('/delete', function(req, res){
       Event.remove({ _id : req.body.id}, function(err, event){
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
           description : req.body.description,
           time : req.body.time
           }
      Event.update({_id : req.body.id}, {$set: terms}, function(error, event){
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



    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs');
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
        });
    };

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

