var express = require('express');
var mongoose = require('mongoose');
var assert = require('assert');

var app = express();
var server = app.listen(8080, function(){
    console.log('server listening on port  8080');
});

server.on('request', request);


var user_events = require('./models/user_events');

var url = 'mongodb://localhost:27017/swahiliboxdb';

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

function request(request, response) {
    var store = '';

    request.on('data', function(data) 
    {
        store += data;

         user_events.create({

        username: store.username,
        eventname: store.eventname
     });

       

    });

   
 }  
