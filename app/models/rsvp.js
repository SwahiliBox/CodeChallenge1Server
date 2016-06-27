var mongoose = require('mongoose');

//craete the user_event schema

var rsvpSchema = mongoose.Schema({
	firstname: {
		type: String,
		required : true
	},
	lastname: {
		type: String,
		required : true
	},
	phonenumber:{
		type: String,
		required : true
	},
	eventname: {
		type : String,
		required : true

	},  

	date_created: {
    	type: Date,  
    	default: Date.now
    }
});

//create a model to use the schema
module.exports = mongoose.model('Rsvp', rsvpSchema);
