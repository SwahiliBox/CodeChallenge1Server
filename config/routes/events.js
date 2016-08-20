var express    =  require('express');
var app        =  express();
var router     =  express.Router();
var cors       =  require('cors');
var Event      =  require('../../app/models/event');

module.exports =  function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //send events to frontend
  app.get('/admin/events', isLoggedIn, function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('events/index',{
          events: events,
          page: 'events',
          title: 'Manage Events'
      });
    });
  });

  // GET request for fetching the form for creating new event 
  app.get('/events/new', isLoggedIn, function(req,res){
    res.render('events/new', {
        title : "Create Event",
        page  : "events"
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

  // POST restful route for creating events 
  app.post('/events/create', function(req, res, next){
    /* create a new instance of event  */
    var event   =  new Event();

    event.title =  req.body.title;
    event.venue =  req.body.venue;
    event.date  =  req.body.date;
    event.time  =  req.body.time;
    event.desc  =  req.body.desc;
    event.slug  =  event.slugify(req.body.title);

    console.log("event at this stage", event);

    Event.findOne({slug: event.slug}, function(err, foundEvent){
      if (foundEvent){
        req.flash('errors', 'Event Already already exists');
        return res.redirect('/admin/events');
      } else{
        event.save(function(err, event){
          if (err) return next(err);
          res.redirect('/admin/events');
          console.log("saved event ", event);
        });
      }
    });
  });

  //deleting an event by slug route
  app.get('/events/delete/:slug',  function(req, res) {
    Event.remove({
        slug : req.params.slug 
    }, function(err, events) {
      if (err)
        res.send(err);
      console.log('event deleted');

      res.redirect('/admin/events');
    });
  });

  //get edit page
  app.get('/events/edit/:slug', isLoggedIn, function(req, res){
    Event.findOne({ slug : req.params.slug }, function (err, event){
      if(err) return err;
      var message = '';
      res.render('events/edit', {
          event   : event,
          message : message,
          title   : "update",
          page    : "events"
      });
    });
  });

  //Updating events data in collection.
  app.post('/events/update/', function(req, res, next){
    Event.findOne({slug: req.body.slug}, function(err, event){
      if (err) return next(err);
      if (req.body.title) event.title =  req.body.title;
      if (req.body.venue) event.venue =  req.body.venue;
      if (req.body.desc) event.desc   =  req.body.desc;
      if (req.body.date) event.date   =  req.body.date;
      if (req.body.time) event.time   =  req.body.time;
      event.save(function(err){
        if (err) return next(err);
        req.flash('message', 'Event successfully updated');
        res.redirect('/admin/events');
      });
    });
  });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/session/new');
}

app.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});
