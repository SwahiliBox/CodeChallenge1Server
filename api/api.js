var router   = require('express').Router();
var faker    = require('faker');
var Event    = require('../app/models/event');

router.get('/create-events', function(req, res){
  for(var i = 0; i < 30; i++){
    event           = new Event();

    event.title =  faker.name.title();
    event.venue =  faker.address.county();
    event.desc  =  faker.lorem.paragraph();
    event.date  =  Date.now();
    event.time  =  faker.date.weekday();

    event.save();
  }
});

module.exports = router;
