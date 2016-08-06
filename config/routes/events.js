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
      res.render('events/index',{
          events: events,
          page: 'events', 
          title: 'Manage Events'
      });
    });
  });

  //Crud Page.
  app.get('/insert', isLoggedIn, function(req,res){
    res.render('eventsrecords', {
        title: "Insert",
        page:   "events"
    });
  });

  //send events to frontend
  app.get('/event', isLoggedIn, function(req, res){
    Event.find({}, function(err, event){
      if(err)
        res.send(err);
      res.json(event);
    });
  });

  //insert values into mongo db
  app.post('/insert', function(req, res){
    Event.create({
        title: req.body.title,
        venue: req.body.venue,
        date:  req.body.date,
        time:  req.body.time,
        desc:  req.body.desc
    },
    function(err, event){
      if(err)
        res.send(err);

      Event.find({}, function(err, event){
        if(err)
          res.send(err);
        //res.redirect('eventsrecords.html');
        res.render('eventsrecords');
      });
    });
  });

  //Deleting events data from collection.
  app.post('/delete', function(req, res){
    Event.remove({ _id: req.body.id}, function(err, event){
      if(err)
        res.send(err);
      Event.find({}, function(err, event){
        if(err)
          res.send(err);
        //res.redirect('eventsrecords.html');
        res.render('eventsrecords');
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
    };
    Event.update({_id : req.body.id}, {$set: terms}, function(error, event){
      //if(err)
      //res.send(err);
      Event.find({}, function(err, event){

        if(err) res.send(err);

        console.log(terms);
        //res.redirect('eventsrecords.html');
        res.render('eventsrecords');
      });
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

