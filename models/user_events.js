var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//craete the user_event schema

var user_eventSchema = new Schema({
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
var user_events = mongoose.model('user_events', user_eventSchema);

//make the model available to our node apllications

module.exports = user_events;