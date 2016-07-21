var router = require('express').Router();
var cors   = require('cors');
var Rsvp   = require('../../app/models/rsvp');

module.exports = function(app,passport){
  app.use(cors());
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

app.post('/rsvp', function(req,res){
  Rsvp.create({
      firstname:    req.body.firstname,
      lastname:     req.body.lastname,
      phonenumber:  req.body.phonenumber,
      eventname:    req.body.eventname
  }, function(error,rsvp){

    if(error) console.log(error);
    console.log(rsvp);

    console.log("successful insert");
    res.send('success:' + rsvp);
  });
});

app.get('/rsvp', function(req, res){
  Rsvp.find({}, function(err, rsvp){

    if(err) res.send(err);

    res.json(rsvp);
  });
});
};
