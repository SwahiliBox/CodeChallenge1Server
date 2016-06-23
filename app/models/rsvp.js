var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//craete the user_event schema

var rsvpSchema = new Schema({
	username: {
		type: String,
		required : true
	},

	eventname: {
		type : String,
		required : true,

	},  

	date_created: {
    	type: Date,  
    	default: Date.now
    }
});

//create a model to use the schema
var Rsvp = mongoose.model('Rsvp', rsvpSchema);

//make the model available to our node apllications

module.exports = Rsvp;