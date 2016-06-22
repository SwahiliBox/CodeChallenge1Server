////////// firefly_coder //////////////

//Initialize required node_modules.
var express = require('express');
var application = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var methodOverride = require('method-override');

//Connect to MongoDb.
mongoose.connect('mongodb://localhost/test');

//Craete a port to listen on.
var port = process.env.PORT || 3000;

//Initialize the required Middleware.
application.use(methodOverride());
application.use(bodyParser.urlencoded({'extended' : 'false'}));
application.use(morgan('dev'));
application.use(express.static(path.join(__dirname, 'views')));

//Create a Schema model to hold your events data.
var Events = mongoose.model('Events', {
	title : String,
    venue : String,
    date : {type :Date,
            default: Date.now
          },
    time : String,
    rsvp : {type : Boolean,
        default : false}
});

//Crud Page.
application.get('/crud', function(request, response){
    response.sendFile('crud.html', {'root' : 'views'});
});

//Return all the events from the collection.
application.get('/events', function(request, response){
	Events.find({}, function(error, events){
		if(error)
			response.send(error)
		response.json(events)
	});
});

//Insert events data into collection.
application.post('/insert', function(request, response){
    Events.create({title : request.body.title,
                   venue : request.body.venue,
                   date : request.body.date,
                   time : request.body.time,
                   rsvp : request.body.rsvp
                 },
        function(error, events){
             if(error)
                response.send(error)
             Events.find({}, function(error, events){
                  if(error)
                    response.send(error);
                    response.redirect('crud.html');
             });
        });
});

//Deleting events data from collection.
application.post('/delete', function(request, response){
   Events.remove({ _id : request.body.id}, function(error, events){
      if(error)
        response.send(error)
      Events.find({}, function(error, events){
        if(error)
          response.send(error);
        response.redirect('crud.html');
      });
   });
});

//Updating events data in collection.
application.post('/update', function(request, response){
   var terms = {
       title : request.body.title,
       venue : request.body.venue,
       date : request.body.date,
       time : request.body.time
       }
  Events.update({_id : request.body.id}, {$set: terms}, function(error, events){
     if(error)
      response.send(error);
    Events.find({}, function(error, events){
      if(error)
        response.send(error);
      console.log(terms);
      response.redirect('crud.html');
    });
  });
});


//Start the express HTTP Server.
application.listen(port, function(){
	console.log("The Magic Happens at port %s Hit Ctrl-c to Quit.", port);
});