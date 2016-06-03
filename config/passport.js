var LocalStrategy   = require('passport-local').Strategy;
var FacebookStrategy=require('passport-facebook').Strategy;

var User = require('./models/user.js');
var configAuth=require('./auth');
module.exports = function(passport) {

  // used to serialize the user for the session
     passport.serializeUser(function(user, done) {
         done(user.id);
     });

     // used to deserialize the user
     passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
             done(err, user);
         });
     });
     passport.use('local-signup', new LocalStrategy({
       // by default, local strategy uses username and password, we will override with email
       usernameField : 'User name',
       emailField    : 'email',
       passwordField : 'password',
       passReqToCallback : true // allows us to pass back the entire request to the callback
   },
   function(req, email, password, done) {
            process.nextTick(function() {
   User.findOne({ 'local.username' :  email }, function(err, user) {
       if (err)
           return done(err);
       if (user) {
           return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
       } else {
           var newUser            = new User();
           newUser.local.username    = email;
           newUser.local.password = newUser.generateHash(password);

           newUser.save(function(err) {
               if (err)
                   throw err;
               return done(null, newUser);
           });
       }

   });

   });

}));
passport.use('local-login',new LocalStrategy({
  usernameField:'email',
  passwordField:'password',
  passReqToCallback:true
},
function(req,email,password,done){
  process.nextTick(function(){
    User.findone({'local-username':email},function(err,user){
      if(err)
         return done(err);
      if (user)
         return done(null,false,req.flash('loginMessage','No User found'));
      if (user,valid(Password)){
        return done(null,false,req.flash('loginMessage','invalid password'));
      }
      return done(null,user);
    });
  });

}));
passport.use(new FacebookStrategy({
  clientID      : configAuth.facebookAuth.clientID,
  clientSecret : configAuth.facebookAuth.clientSecret,
  callbackURL  : configAuth.facebookAuth.callbackURL
},
function(accessToken,refreshToken,profile,done){
    process.nextTick(function(){
      user.findOne({'facebook.id':'profile,id'},function(err,user){
        if(err)
        return done(err);
        if (user)
        return done(null,user);
        else{
          var newUser=new User();
          newUser.facebook.id=profile.id;
          newUser.facebook.taken=accessToken;
          newUser.facebook.name=profile.name.givenName + '' + profile.name.familyName
          newUser.facebook.email=profile.emails[0].value;
          newUser.save(function(err){
            if (err)
              throw err;
            return done(null,newUser);
          });
          console.log(profile);
        }
      });
  });
}
));
}
