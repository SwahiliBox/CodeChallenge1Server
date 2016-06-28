var mongoose = require('mongoose');

//craete the user_event schema

var rsvpSchema = mongoose.Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	phonenumber:{
		type: String
	},
	eventname: {
		type : String

	},  

	date_created: {
    	type: Date,  
    	default: Date.now
    }
});

//create a model to use the schema
module.exports = mongoose.model('Rsvp', rsvpSchema);
