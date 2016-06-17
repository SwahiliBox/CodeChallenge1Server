var express = require('express');
var mongoose = require('mongoose');
var assert = require('assert');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser);

var server = http.createServer(app);

server.listen(7000);
console.log('server listening on port 7000');



var user_events = require('./models/user_events');

var url = 'mongodb://localhost:27017/swahiliboxdb';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', function(){


	console.log('connection successful');

	server.on('request', request);

	function request(request, response) {
      
      var details = '';

    request.on('data', function(data) 
    {
        details = JSON.parse(data);


       user_events.create({

            username : details.username,
            eventname : details.eventname
        });
         
        });

    
     
     
    request.on('end', function() 
    {  console.log(details);
        
        
    });

  
 } ;

  


});


