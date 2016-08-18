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

  //send events to admin page
  app.get('/admin', isLoggedIn, function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
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
  app.get('/update/:event_id', isLoggedIn, function(req, res){
    Event.findOne({ _id : req.params.event_id }, function (err, events){
      if(err) return err;
      var message = '';
      res.render('update', {
         events: events,
         id : req.params.event_id,
        message: message,
        title: "update",
        page:   "update"
      });
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
  //got rid of the meta array
  app.post('/insert', function(req, res){
    Event.create({
      'title': req.body.title,
      'venue': req.body.venue,
      'date':  req.body.date,
      'time':  req.body.time,
      'desc':  req.body.desc
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

   //deleting an event by id route
   app.get('/delete/:event_id', function(req, res) {
      Event.remove({
          _id : req.params.event_id
      }, function(err, events) {
          if (err)
              res.send(err);
          console.log('event deleted');

            res.redirect('/events');
          });
});

 //Updating events data in collection.
 app.post('/update', function(req, res){
        var id = req.body.id;
        var changedtitle = req.body.title;
        var changedvenue = req.body.venue;
        var changeddate =  req.body.date;
        var changeddesc =  req.body.desc;
        var changedtime =  req.body.time;

        Event.findOne({_id : id}, function(err, events){
           Event.update({
             title : changedtitle,
             venue : changedvenue,
             date : changeddate,
             desc : changeddesc,
             time : changedtime
           }, function(error, event){
            console.log('Event updated');
            console.log(events);
            res.redirect('/events');
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

 app.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
