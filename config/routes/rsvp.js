var Rsvp       =  require('../../app/models/rsvp');

module.exports =  {
  index : function(req, res){
    Rsvp.find({}, function(err, rsvps){
      if(err) res.send(err);
      res.json(rsvps);
    });
  },

  create : function(req, res){
    Rsvp.create({
        user_id   : req.body.user_id,
        event_id  : req.body.event_id
    }, function(error,rsvp){
      if(error) console.log(error);
      console.log(rsvp);
      console.log("successful insert");
      res.send('success:' + rsvp);
    });
  }
};
