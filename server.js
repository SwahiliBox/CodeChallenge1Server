
<<<<<<< HEAD
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
var exphbs  = require('express-handlebars');
var expressValidator= require('express-validator');

=======
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var http     =require('http');
var mongoose = require('mongoose');
var mongodb  =require('mongodb');
>>>>>>> 20a290ef70c312e8211849834476330896e68c79
var passport = require('passport');
var path = require('path');
var flash    = require('connect-flash');
<<<<<<< HEAD
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
=======
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session=require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

var methodOverride = require('method-override');  

 Event = require('./app/models/event');


require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'views')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'views')));
//mongoose.connect('mongodb://localhost/adminDB');
//var db=mongoose.connection;
/*
//Crud Page.
app.get('/eventsrecords',function(req,res){
      res.render('eventsrecords.ejs');
    });
//return events from collection
app.get('/event',function(req,res){
	 Event.find(function(err, event) {
            if (err)
                res.send(err);

            res.json({event});
        });
    });
 
//insert event data
app.post('/insert', function(req, res){
//app.post('/api/event',function(req,res){
	Event.create({title : req.body.title,
                  venue : req.body.venue,
                  description :req.body.description,
                  date : req.body.date,
                  time : req.body.time
                  //rsvp : request.body.rsvp
                 },
        function(err, event){
             if(err)
                res.send(err)
             Event.find({}, function(err, event){
                  if(err)
                    res.send(err);
                    res.render('eventsrecords.ejs');
             });
        });
});
>>>>>>> 20a290ef70c312e8211849834476330896e68c79

//update event data
app.post('/update', function(req, res){
//app.put('/api/event/:id',function(req,res){
  var id=req.params._id;
	var event=req.body;
     Event.update(id,event,{},function(err, event) {
            if (err)
                res.send(err);

            res.render('eventsrecords.ejs');
        });
    });
//});
//delete event data
app.post('/delete', function(req, res){
//app.delete('/api/event/:id',function(req,res){
var id=req.params._id;
     Event.remove(id,function(err, event) {
            if (err)
                res.send(err);
     Event.findById(req.params._id,function(err, event) {
     //Event.find({}, function(err, event){
        if(err)
          res.send(err);
            res.render('eventsrecords.ejs');
        });
    });
   });
 
     */
app.set('view engine', 'html');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

<<<<<<< HEAD

require('./app/routes.js')(app,passport);

=======
require('./app/routes.js')(app, passport);
>>>>>>> 20a290ef70c312e8211849834476330896e68c79


app.listen(port);
console.log('Server running on localhost: port ' + port);



