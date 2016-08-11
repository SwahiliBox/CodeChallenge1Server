//Schema for events display to users
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Create a Schema model to hold your events data.
//got rid of the meta array
var eventSchema = Schema({
    title: String,
    venue: String,
    desc:  String,
    date:  {type: Date},
    time:  String
});

var Event = module.exports = mongoose.model('Event',eventSchema);
module.exports.getEventByTitle = function(title, callback){
  var query = {'title': title};
  Event.findOne(query,callback);
};
