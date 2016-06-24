<<<<<<< HEAD

=======
>>>>>>> abd60916f143cb7072d205f30824db8dcaa3b1f1
var express=require('express');
var app=express();
var port=process.env.PORT || 3000;
var http=require('http');
var server=http.createServer(app);

//initialize required modules for the app
var session=require('express-session');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var mongoose=require('mongoose');
var mongodb=require('mongodb');

var passport = require('passport');
var passportLocal = require('passport-local');
var flash    = require('connect-flash');
var MongoStore=require('connect-mongo')(session);
var Rsvp = require('./app/models/rsvp');
//connect to mongo database
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

//require passport for authentication
require('./config/passport.js')(passport);

//use required modules
app.use(morgan('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({secret:'anystringoftext',
      saveUninitialized:true,
      resave:false
}));


app.use(passport.initialize());
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

<<<<<<< HEAD
=======
require('./app/routes.js')(app,passport);


app.listen(port);
console.log('Server running on localhost: port ' + port);
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
>>>>>>> abd60916f143cb7072d205f30824db8dcaa3b1f1

/*

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
<<<<<<< HEAD
db.once('open', function(){ 
	console.log('connection successful'); 
	app.on('request', request);
	function request(request, response) {
        var details = '';
        request.on('data', function(data) {
            details = JSON.parse(data);
            Rsvp.create({
                username : details.username,
                eventname : details.eventname
            });
        });
        request.on('end', function(){
          console.log(details);
        });
    } ;
});
 
*/
require('./app/routes.js')(app,passport);

server.listen(port);
console.log('Server running on localhost: port ' + port);
=======


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

>>>>>>> abd60916f143cb7072d205f30824db8dcaa3b1f1
