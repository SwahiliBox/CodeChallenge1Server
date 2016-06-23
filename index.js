////////// firefly_coder //////////////

//Initialize required node_modules.
var express = require('express');
var app = express();
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
app.use(methodOverride());
app.use(bodyParser.urlencoded({'extended' : 'false'}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));

//Create a Schema model to hold your events data.
var Events = mongoose.model('Events',
 {
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
app.get('/crud', function(req, res){
    res.sendFile('crud.html', {'root' : 'views'});
});

//Return all the events from the collection.
app.get('/events', function(req, res){
	Events.find({}, function(error, events){
		if(error)
			res.send(error)
		res.json(events)
	});
});

//Insert events data into collection.
app.post('/insert', function(req, res){
    Events.create({title : req.body.title,
                   venue : req.body.venue,
                   date : req.body.date,
                   time : req.body.time,
                   rsvp : req.body.rsvp
                 },
        function(error, events){
             if(error)
                res.send(error)
             Events.find({}, function(error, events){
                  if(error)
                    res.send(error);
                    res.redirect('crud.html');
             });
        });
});

//Deleting events data from collection.
app.post('/delete', function(req, res){
   Events.remove({ _id : req.body.id}, function(error, events){
      if(error)
        res.send(error)
      Events.find({}, function(error, events){
        if(error)
          res.send(error);
        res.redirect('crud.html');
      });
   });
});

//Updating events data in collection.
app.post('/update', function(req, res){
   var terms = {
       title : req.body.title,
       venue : req.body.venue,
       date : req.body.date,
       time : req.body.time
       }
  Events.update({_id : req.body.id}, {$set: terms}, function(error, events){
     if(error)
      res.send(error);
    Events.find({}, function(error, events){
      if(error)
        res.send(error);
      console.log(terms);
      res.redirect('crud.html');
    });
  });
});


//Start the express HTTP Server.
app.listen(port, function(){
	console.log("The Magic Happens at port %s Hit Ctrl-c to Quit.", port);
});
