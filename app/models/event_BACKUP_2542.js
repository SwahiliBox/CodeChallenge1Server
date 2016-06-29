
//Schema for events display to users
var mongoose=require('mongoose');

//Create a Schema model to hold your events data.
var eventSchema = mongoose.Schema({
    title : String,
    venue : String,
    desc  : String,
    date  : {type :Date
            //default: Date.now
          },
    time : String,
<<<<<<< HEAD
    desc : String
=======
    
>>>>>>> cecb507236da60d32fb717859405923ec3d1238f
});

module.exports = mongoose.model('Event',eventSchema);
