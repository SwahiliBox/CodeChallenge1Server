var express=require('express');
var app=express();
var port=process.env.PORT || 3000;

var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var mongodb=require('mongodb');
<<<<<<< HEAD
var passport=require('passport');
var flash=require('connect-flash');
=======
var passport = require('passport');
var passportLocal = require('passport-local');
var flash    = require('connect-flash');
var MongoStore=require('connect-mongo')(session);
>>>>>>> 65441380c93e4cfc7d536b5ecf2cbe29656f3949

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

require('./config/passport.js')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
<<<<<<< HEAD
app.use(session({secret:'anystringoftext',saveUninitialized:true,resave:true}));
app.set('view engine', 'ejs');
=======
app.use(session({secret:'anystringoftext',
                saveUninitialized:true,
                resave:true}));


>>>>>>> 65441380c93e4cfc7d536b5ecf2cbe29656f3949
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

<<<<<<< HEAD
require('./app/routes.js')(app,passport);

var server=app.listen(port,function(){
  var host=server.address().address
  var port=server.address().port

  console.log('Example is listening at http://%s:%s',host,port);
})
=======
/*app.use(function(req,res,next){
	console.log(req.session);
	console.log("==========");
	console.log(req.user);
	next();
});
*/

app.set('view engine', 'ejs');

/*var auth=express.Router();
require('./app/routes/auth.js')(auth,passport);
app.use('/auth',auth);

var secure=express.Router();
require('./app/routes/secure.js')(secure,passport);
app.use('/',secure);
*/
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('The magic happens on port ' + port);
>>>>>>> 65441380c93e4cfc7d536b5ecf2cbe29656f3949
