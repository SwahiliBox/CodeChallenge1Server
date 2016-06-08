<<<<<<< HEAD
var User=require('./models/users');
module.exports=function(app,passport){
    app.get('/',function(req,res){
      res.render('index.ejs');
    });

    
    //route for google+
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));
    //route for processing showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
=======
var user = require('./models/user.js');
module.exports = function(app, passport) {
   app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    //profile
     app.get('/profile', isLoggedIn, function(req, res) {
>>>>>>> 65441380c93e4cfc7d536b5ecf2cbe29656f3949
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

<<<<<<< HEAD
    app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });
}
=======
    // FACEBOOK ROUTES 
    // route for facebook authentication and login
    app.get('/auth/facebook',
passport.authenticate('facebook', { scope: ['email']}),
    function(req, res){
});
    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {successRedirect : '/profile',
                                           failureRedirect : '/'
        }));
//logout
     app.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });
};


>>>>>>> 65441380c93e4cfc7d536b5ecf2cbe29656f3949
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
  
    // if they aren't redirect them to the home page
    res.redirect('/');
}