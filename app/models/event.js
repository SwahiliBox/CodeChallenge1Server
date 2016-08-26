//Schema for events display to users
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

//Create a Schema model to hold your events data.
//got rid of the meta array
var EventSchema = new Schema({
    title : String,
    venue : String,
    desc  : String,
    slug  : {type : String, default : ""},
    date  : {type : Date},
    time  : String
});

EventSchema.methods.getEventByTitle = function(title, callback){
  var query = {'title': title};
  Event.findOne(query,callback);
};

EventSchema.methods.slugify =  function(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')        // Replace spaces with -
  .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
  .replace(/\-\-+/g, '-')      // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text
}; 

module.exports = mongoose.model('Event', EventSchema);

