//Schema for events display to users
var mongoose = require('mongoose');

//Create a Schema model to hold your events data.
var eventSchema = mongoose.Schema({
    title: String,
    venue: String,
    desc:  String,
    date:  {type :Date
      //default: Date.now
    },
    time:  String,
});

module.exports = mongoose.model('Event',eventSchema);
