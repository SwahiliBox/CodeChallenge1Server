
//Schema for events display to users
var mongoose=require('mongoose');

//Create a Schema model to hold your events data.
var eventSchema = mongoose.Schema({
	title : String,
    venue : String,
    date : {type :Date
            //default: Date.now
          },
    time : String,
    rsvp : {type : Boolean,
        default : false},
    desc : String
});

module.exports = mongoose.model('Events',eventSchema);
