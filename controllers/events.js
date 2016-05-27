var Event = require("../models/events");

exports.getEvents = function(req, res){
	// body...
	res.send("Getting All Events");
}; 

exports.getEvent = function(req, res) {
	// body...
	res.send("Get a Single Event");
}

exports.addEvent = function(req, res) {
	// body...
	res.send("Adding an Event");
}

exports.updateEvent = function(req, res) {
	// body...
	res.send("Updating an Event");
}

exports.deleteEvent = function(req, res) {
	// body...
	res.send("Delete an Event");
}

