var express=require('express');
var app=express();
var port=process.env.PORT || 3000;

var cookieParser=require('cookie-parser');
var session=require('express-session');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var mongodb=require('mongodb');
var passport=require('passport');
var flash=require('connect-flash');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport.js')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:'anystringoftext',saveUninitialized:true,resave:true}));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app,passport);

var server=app.listen(port,function(){
  var host=server.address().address
  var port=server.address().port

  console.log('Example is listening at http://%s:%s',host,port);
})
