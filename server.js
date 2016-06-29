
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var http     =require('http');
var mongoose = require('mongoose');
var mongodb  =require('mongodb');
var passport = require('passport');
var path = require('path');
var flash    = require('connect-flash');
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

app.set('view engine', 'html');

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app, passport);


app.listen(port);
console.log('The magic happens on port ' + port);
