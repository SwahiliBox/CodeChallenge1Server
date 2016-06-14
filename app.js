// call the packages we need
var express= require('express');        // call express
var path = require('path');                 // define our app using express
var cookieParser = require('cookie-parser');
var bodyparser= require('body-parser');
var exphbs  = require('express-handlebars');
var expressValidator= require('express-validator');
var flash= require('connect-flash');
var session= require('express-session');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo=require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/loginapp');
var db=mongoose.connection;
var routes=require('./routes/index');
var users=require('./routes/users');
//init app
var app=express();
//view engine
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultlayout:'layout'}));
app.set('view engine','handlebars');
//body-parser middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cookieParser());
// set static folder
app.use(express.static(path.join(__dirname,'public')));
//express session
app.use(session({secret:'secret',saveUninitialized:true,resave:true}));
//passport init
app.use(passport.initialize());
app.use(passport.session());
//express validator
app.use(expressValidator({
  errorFormatter:function(param,msg,value){
    var namespace=param.split('.')
    ,root=namespace.shift()
    ,formParam = root;
    while(namespace.length){
      formParam +='['+ namespace.shift()+']';
    }
    return{
      param:formParam,
      msg:msg,
      value:value
    };
  }
}));
//app.dynamicHelpers({ messages: require('express-messages') });
//connect-flash
app.use(flash());
//global vars
app.use(function(req,res,next){
  res.locals.success_msg=  req.flash('success_msg');
  res.locals.error_msg=  req.flash('error_msg');
  res.locals.error=  req.flash('error');
  next();
});
app.use('/',routes);
app.use('/users',users);
//set port
app.set('port',(process.env.PORT || 3000));
app.listen(app.get('port'),function(){
  console.log('server started on port'+app.get('port'));
});
