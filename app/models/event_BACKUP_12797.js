
//Schema for events display to users
var mongoose=require('mongoose');

//Create a Schema model to hold your events data.
var eventSchema = mongoose.Schema({
<<<<<<< HEAD
	title : String,
=======
    title : String,
>>>>>>> 20a290ef70c312e8211849834476330896e68c79
    venue : String,
    date : {type :Date
            //default: Date.now
          },
    time : String,
<<<<<<< HEAD
    rsvp : {type : Boolean,
        default : false},
    desc : String
});

module.exports = mongoose.model('Events',eventSchema);
=======
    description : String
});

module.exports = mongoose.model('Event',eventSchema);
/*
//Get events
module.exports.getEvent =function(callback,limit){
	Event.find(callback).limit(limit);
}

//create event
module.exports.addEvent =function(event, callback){
	Event.create(event, callback);
}
//update event
module.exports.updateEvent =function(id, event, callback){
	var query={_id:id};
	var update={
		title : req.body.title,
        venue : req.body.venue,
        description :req.body.description,
        date : req.body.date,
        time : req.body.time
		//title : event.title,
        //venue : event.venue,
	    //description : event.description,
        //date : event.date,
        //time : event.time
	}
	Event.findOneAndUpdate(query, update, options, event, callback);
}
  //delete event
module.exports.removeEvent =function(id, callback){
	var query={_id:id};
	Event.remove(query, callback);
}
*/
>>>>>>> 20a290ef70c312e8211849834476330896e68c79
