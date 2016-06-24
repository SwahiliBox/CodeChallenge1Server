var express=require('express');
var User = require('./models/user');
var Events = require('./models/event');
var Rsvp = require('./models/rsvp');
module.exports=function(app,passport){

    //GOOGLE ROUTES
    //route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {
                    successRedirect : '/profgmail',
                    failureRedirect : '/'
            }));


    // FACEBOOK ROUTES
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email']}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {successRedirect : '/proffacebook',
                                           failureRedirect : '/'
        }));



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

    //insert values into mongo db
    app.post('/insert', function(req, res){
        Events.create({
          title : req.body.title,
          venue : req.body.venue,
          date : req.body.date,
          time : req.body.time,
          desc : req.body.desc,
          rsvp : req.body.rsvp
        },
        function(error, events){
           if(error)
              res.send(error)

           Events.find({}, function(error, events){
              if(error)
                  res.send(error);

              res.redirect('crud.html');
           });
        });
    });

    //Deleting events data from collection.
    app.post('/delete', function(req, res){
       Events.remove({ _id : req.body.id}, function(error, events){
          if(error)
            res.send(error)
          Events.find({}, function(error, events){
            if(error)
              res.send(error);
            res.redirect('crud.html');
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
      Events.update({_id : req.body.id}, {$set: terms}, function(error, events){
         if(error)
          res.send(error);
        Events.find({}, function(error, events){
          if(error)
            res.send(error);
          console.log(terms);
          res.redirect('crud.html');
        });
      });
    });


    app.post('/rsvp', function(req,res){
        Rsvp.create({
          username : req.body.username,
          eventname : req.body.eventname
        }, function(error,rsvp){
          if(error)
            console.log(error);

          console.log(rsvp);
          console.log("successful insert")
        });

      console.log("Successful read");

    });
};


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.send('Authentication unsuccessful');

}
