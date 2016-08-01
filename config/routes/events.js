var express= require('express');
var app              = express();
var router=express.Router();
var cors   = require('cors');
var Events = require('../../app/models/event');

module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

//send events to frontend
app.get('/events', function(req, res){
  Events.find({}, function(error, events){
    if(error)
      res.send(error);
    res.json(events);
  });
});

//Crud Page.
app.get('/insert', isLoggedIn, function(req,res){
  //res.sendFile('eventsrecords.html', {'root': 'views'});
  res.render('eventsrecords');
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
  Events.create({
      title: req.body.title,
      venue: req.body.venue,
      date:  req.body.date,
      time:  req.body.time,
      desc:  req.body.desc
  },
  function(err, event){
    if(err)
      res.send(err);

    Events.find({}, function(err, event){
      if(err)
        res.send(err);
      //res.redirect('eventsrecords.html');
       res.render('eventsrecords');
    });
  });
});

//Deleting events data from collection.
app.post('/delete', function(req, res){
  Events.remove({ _id: req.body.id}, function(err, event){
    if(err)
      res.send(err);
    Events.find({}, function(err, event){
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
  Events.update({_id : req.body.id}, {$set: terms}, function(error, event){
    //if(err)
    //res.send(err);
    Events.find({}, function(err, event){

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
  res.redirect('/login');
}

 app.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  });

//module.exports=router;
