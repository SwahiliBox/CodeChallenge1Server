var mongoose = require('mongoose');

//craete the user_event schema

var rsvpSchema = mongoose.Schema({
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
module.exports = mongoose.model('Rsvp', rsvpSchema);
