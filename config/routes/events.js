var express    = require('express');
var app        = express();
var router     = express.Router();
var cors       = require('cors');
var Event     = require('../../app/models/event');

module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //send events to frontend
  app.get('/events', isLoggedIn, function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      console.log(events);
      res.render('events/index',{
          events: events,
          page: 'events',
          title: 'Manage Events'
      });
    });
  });

  //send events to admin page
  app.get('/admin', isLoggedIn, function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      console.log(events);
      res.render('admin',{
          events: events,
          page: 'admin',
          title: 'Manage Events'
      });
    });
  });

  //Crud Page.
  app.get('/insert', isLoggedIn, function(req,res){
    res.render('event', {
        title: "Insert",
        page:   "events"
    });
  });

  //get update page
  app.get('/update', isLoggedIn, function(req, res){
    var message = '';
    res.render('update', {
      message: message,
      title: "update",
      page:   "update"
    });
  });

 //get delete page
  app.get('/delete', isLoggedIn, function(req, res){
    var message ="";
      res.render('delete', {
        message: message,
        title: "Delete",
        page:   "delete"
      });
  });

  //send events to frontend
  app.get('/event', isLoggedIn, function(req, res){
    Event.find({}, function(err, event){
      if(err)
        res.send(err);
        res.render('event', {event: event, title: "Event", page: "event"});
    });
  });

  //insert values into mongo db
  app.post('/insert', function(req, res){
    Event.create({
      'meta.title': req.body.title,
      'meta.venue': req.body.venue,
      'meta.date':  req.body.date,
      'meta.time':  req.body.time,
      'meta.desc':  req.body.desc
    },
    function(err, event){
      if(err)
        res.send(err);

      Event.find({}, function(err, event){
        if(err)
          res.send(err);
        res.redirect('events');
      });
    });
  });

  //Deleting events data from collection.
 app.post('/delete', function(req, res){
  var title=req.body.title;
  var message = 'Event doesnt exist';
  Event.getEventByTitle(title, function(err, event, done){
    if(err) throw err;
    if(event){
      console.log('event deleted');
      Event.remove({ 'meta.title': req.body.title}, function(err, event){
        if(err)
          res.send(err);
        Event.find({}, function(err, event){
          if(err)
            res.send(err);
           res.redirect('events');
        });
      });
    } else {
      console.log('no such event');
        res.render('delete', {message: message, title: "Delete", page: "delete" });
      }
    });
 });

 //Updating events data in collection.
 app.post('/update', function(req, res){
   var terms = {
     'meta.title': req.body.title,
     'meta.venue': req.body.venue,
     'meta.date':  req.body.date,
     'meta.desc':  req.body.desc,
     'meta.time':  req.body.time
   };
 var title = req.body.title;
   Event.getEventByTitle(title, function(err, event, done){
     if(err) throw err;
     if(event){
       console.log('Event updated');
        Event.update({'meta.title' : req.body.title}, {$set: terms}, function(error, event){
        Event.find({}, function(err, event){
         if(err) res.send(err);

         console.log(terms);
         res.redirect('events');
        });
       });
     } else {
       var message = 'Event doesnt exist';
       console.log('event doesnt exist');
       res.render('update', {message: message, title: "Update", page: "update"});
     }
     });
   });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

 app.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
