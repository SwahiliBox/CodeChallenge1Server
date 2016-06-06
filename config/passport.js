var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;
var User            = require('../app/models/user');
var configAuth      =require('./auth');
module.exports = function(passport) {

  // used to serialize the user for the session
     passport.serializeUser(function(user, done) {
         done(null, user.id);
     });

     // used to deserialize the user
     passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
             done(err, user);
         });
     });
    passport.use('local-signup', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'username',
       emailField    : 'email',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, username, email, password, done) {
            process.nextTick(function() {
   User.findOne({'local.email' :  email }, function(err, user) {
       if (err)
           return done(err);
       if (user) {
           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
       } else {
           var newUser            = new User();
           newUser.local.email     =req.body.email;
           newUser.local.username    = req.body.username;
           newUser.local.password = req.body.password;

         newUser.save(function(err){
            if (err)
              throw err;
            return (null,newUser);
          });
       }

   });

   });

}));
passport.use('local-login',new LocalStrategy({
  emailField:'email',
  passwordField:'password',
  passReqToCallback:true
},
function(req,email,password,done){
  process.nextTick(function(){
    User.findOne({'local-username':email},function(err,user){
      if(err)
         return done(err);
      if (!user) {
         return done(null,false,req.flash('loginMessage','No User found'));
      }
      if (user.local.password!=password) {
        return done(null,false,req.flash('loginMessage','invalid password'));
      }
      return done(null,user);
    });
  });
})); 

 passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : [ 'email' , 'name' ]
    },
//facebook sends back token to profile
function(token,refreshToken,profile,done){
    process.nextTick(function(){
      User.findOne({'facebook.id':'profile.id'},function(err,user){
        if(err)
          return done(err);
        if (user) {
          return done(null,user);
        }else{
          //if no user found
          var newUser=new User();
          //set facebook infomation
          newUser.facebook.id=profile.id;
          newUser.facebook.token=token;
          newUser.facebook.name=profile.name.givenName + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;
          newUser.facebook.displayName = profile.displayName;
          //newUser.facebook.photo = profile.photos[0].value

          newUser.save(function(err){
            if (err)
              throw err;
            return done(null,newUser);
          });
     
      }
  });
});
}));

}