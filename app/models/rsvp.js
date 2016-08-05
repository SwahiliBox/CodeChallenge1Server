var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

//craete the user_event schema
var RsvpSchema =  Schema( {
    firstname:    { type: String },
    lastname:     { type: String },
    phonenumber:  { type: String },
    eventname:    { type: String },  
    date_created: { type: Date,  default: Date.now }
});

//create a model to use the schema
module.exports = mongoose.model('Rsvp', RsvpSchema);
