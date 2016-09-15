/*
 * @admin routes 
 * TODO: come up with other routes
*/

var Event = require('../../app/models/event');

module.exports = {
  index : function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('events/index',{
         events: events,
         page: 'dashboard',
         title: 'Admin Panel'
     });
    });
  }
};
