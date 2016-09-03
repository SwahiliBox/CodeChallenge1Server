var Event      =  require('../../app/models/event');

module.exports = {
  index : function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('events/index',{
          events : events,
          page   : 'events',
          title  : 'Manage Events'
      });
    });
  },

  new : function(req, res){
    res.render('events/new', {
        title : "Create Event",
        page  : "events"
    });
  },

  show : function(req, res){
    Event.find({}, function(err, event){
      if (err) res.send(err);
      res.render('event', {
          event : event,
          title : "Event",
          page  : "event"
      });
    });
  },

  create : function(req, res, next){
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
        req.flash('error', 'Event Already already exists');
        return res.redirect('/admin/events');
      } else{
        event.save(function(err, event){
          if (err) return next(err);
          res.redirect('/admin/events');
          console.log("saved event ", event);
        });
      }
    });
  },

  delete : function(req, res){
    Event.remove({
        slug : req.params.slug 
    }, function(err, events) {
      if (err)
        res.send(err);
      console.log('event deleted');
      res.redirect('/admin/events');
    });
  },

  edit : function(req, res){
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
  },

  update : function(req, res, next){
    Event.findOne({slug : req.params.slug}, function(err, event){
      if (err) return next(err);
      if (req.body.title) event.title =  req.body.title;
      if (req.body.venue) event.venue =  req.body.venue;
      if (req.body.desc) event.desc   =  req.body.desc;
      if (req.body.date) event.date   =  req.body.date;
      if (req.body.time) event.time   =  req.body.time;
      event.save(function(err){
        if (err) return next(err);
        req.flash('success', 'Event successfully updated');
        res.redirect('/admin/events');
      });
    });
  }
};
