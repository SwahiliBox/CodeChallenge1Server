//Schema for events display to users
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Create a Schema model to hold your events data.
var EventSchema = Schema({
    title: String,
    venue: String,
    desc:  String,
    date:  {type :Date
    },
    time:  String,
});

module.exports = mongoose.model('Event',EventSchema);
