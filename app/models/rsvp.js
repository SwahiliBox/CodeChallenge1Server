var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var User       = require('../../app/models/user');
var Event      = require('../../app/models/event');

//craete the user_event schema
var RsvpSchema =  Schema( {
  user_id  : [{type: Schema.Types.ObjectId, ref:User }],
  event_id : [{type: Schema.Types.ObjectId, ref:Event}]
});

//create a model to use the schema
module.exports = mongoose.model('Rsvp', RsvpSchema);
