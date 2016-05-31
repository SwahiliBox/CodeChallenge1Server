var express=require('express');
var router=express.Router();
var passport=require('passport');
var LocalStrategy=require('passport-local').Strategy;

var User=require('../models/user');
//Register
router.get('/register',function(req,res){
	res.render('register');
});
//Login
router.get('/login',function(req,res){
	res.render('login');
});
//Register user
router.post('/register',function(req,res){
	var first name:req.body.name;
	var surname:req.body.name;
	var email:req.body.email;
	var username:req.body.username;
	var password=req.body.password;
	var password2=req.body.password2;

	//validation
	req.checkBody('first name','Name is required').not empty();
	req.checkBody('surname','Surname is required').not empty();
	req.checkBody('email','Email is required').not empty();
	req.checkBody('email','Email is not valid').is email();
	req.checkBody('username','Username is required').not empty();
	req.checkBody('password','Password is required').not empty();
	req.checkBody('password2','Passwords ido not match').equals(req,body.password);

	var (errors){
		res.render('register',{
			errors:errors
		});
	}else{
		var newUser:new User,({
		    first name:first name,
		    surname:surname,
		    username:username,
		    email:email,
		    password:password
		    )};
		user.createUser(newUser,function(err,user){
			if (err)throw err;
			console.log(user);

		});
		req.flash('success_msg','Registered now login');
		res.redirect('/users/login');
	}
});
passport.use(new LocalStrategy(
	function(username,password,done){
		User.getElementByUserByUsername,function(err,user){
		 if(err)throw err;
		 if(!user){
		 	return done(null,false,{message:'Unknown User'});
		 }

		 User.comparePassword(password,user.password,function(err, isMatch){
		 	if(err)throw err;
		 	if(isMatch){
		 		return done(null,user);
		 	}else{
		 		return done(null,false,{message:'invalid password'});
		 	}
		 });
		});
	}));
passport.serializeUser(function(user,done){
	done(null,user.id)
});
passport.deserializeUser(function(id,done){
	User.getUserById(id,function(errr,user){
		done(err,user);
	});
});
app.passport('login',
	passport.authenticate('local',{successRedirect:'/failureRedirect',('/users/login',failureFlash:true}),
	function(req,res){
	});
	router.get('logout',function(req,res){
		req.logout();
		req.flash('success_msg','You are logged out');
	res.redirect('/users/login');
	});
module.exports=router;