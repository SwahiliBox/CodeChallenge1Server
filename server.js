var express          = require('express');
var nodemailer       = require('nodemailer');
var app              = express();
var port             = process.env.PORT || 3000;

//initialize required modules for the app
var passport         =  require('passport');
var bodyparser       =  require('body-parser');
var morgan           =  require('morgan');
var path             =  require('path');
var mongoose         =  require('mongoose');
var ejs              =  require('ejs');
var engine           =  require('ejs-mate');
var mongodb          =  require('mongodb');
var exphbs           =  require('express-handlebars');
var expressvalidator =  require('express-validator');
var morgan           =  require('morgan');
var cookieParser     =  require('cookie-parser');
var bodyParser       =  require('body-parser');
var session          =  require('express-session');
var methodOverride   =  require('method-override');
var flash            =  require('connect-flash');
var cors             =  require('cors');
var MongoStore       =  require('connect-mongo')(session);
var rsvp             =  require('./app/models/rsvp');
var apiRoutes        =  require('./api/api');
var routes           =  require('./config/routes/index');

//connect to mongo database
var configDB         = require('./config/database');
mongoose.connect(configDB.url);

//use required modules
app.use(morgan('dev'));
app.use(methodOverride());

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

app.use(session({
   resave:              true,
   saveUninitialized:   true,
   secret:              configDB.secret,
   store:               new MongoStore({ url: configDB.url, autoReconnect: true })
}));

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'html');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/*
   this middleware is used to make the user object accessible
   throughout the whole request / response cycle and it has to be
   defined after app.use(passport.session()) otherwise it won't work
*/
app.use(function(req, res, next){
  res.locals.user     =  req.user;
  res.locals.messages =  req.flash();
  next();
});


app.use(function(req, res, next) {
  app.use(cors());
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*
 * @start using our route middlewares
*/
app.use('/api',       apiRoutes);
app.use(routes);

app.listen(port);
console.log('Server running on localhost: port ' + port);
