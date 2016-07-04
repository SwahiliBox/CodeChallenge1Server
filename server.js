
var express=require('express');
var nodemailer = require('nodemailer');
var app=express();
var port=process.env.PORT || 3000;

//initialize required modules for the app
var passport = require('passport');
var session=require('express-session');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var path = require('path');
var methodOverride = require('method-override');
var mongoose=require('mongoose');
var mongodb=require('mongodb');
var exphbs  = require('express-handlebars');
var expressValidator= require('express-validator');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session=require('express-session');
var methodOverride = require('method-override'); 
var flash = require('connect-flash'); 
var cors = require('cors');


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
app.use(cookieParser());

app.use(session({secret:'anystringoftext',
      saveUninitialized:true,
      resave:false
}));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./config/passport')(passport);

app.set('view engine', 'html');

app.use(passport.initialize());
app.use(passport.initialize());

app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on localhost: port ' + port);



