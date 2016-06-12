var user = require('./models/user.js');
module.exports = function(app, passport) {
   app.get('/', function(req, res) {
        res.render('index.ejs');
    });


    //profile
     app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

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


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
  
    // if they aren't redirect them to the home page
    res.redirect('/');
}