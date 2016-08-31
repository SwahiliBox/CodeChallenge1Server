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
        firstname   : req.body.firstname,
        lastname    : req.body.lastname,
        phonenumber : req.body.phonenumber,
        eventname   : req.body.eventname
    }, function(error,rsvp){
      if(error) console.log(error);
      console.log(rsvp);
      console.log("successful insert");
      res.send('success:' + rsvp);
    });
  }
};
