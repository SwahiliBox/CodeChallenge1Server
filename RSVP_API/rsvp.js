var mongoose = require('mongoose');
var assert = require('assert');

var user_events = require('./models/user_events');
 
var url = 'mongodb://localhost:27017/swahiliboxdb';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
	console.log('connection to the server successful');

	//create a new user_event

	var newUser_event = user_events({

		username : ' Francis ',

		eventname: 'git day 67'
	});

	newUser_event.save(function(err){

		if (err) throw err;

		console.log('user_event saved');
	}); 
     

   

	user_events.find({},function(err, user_event){

		if(err) throw err;

		console.log(user_event);

		/*db.collection('user_events').drop(function(){
		console.log('collection deleted');
		db.close()
	});*/
	});

});
