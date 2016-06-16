
var User=require('./models/user');
module.exports=function(app,passport){
    app.get('/',function(req,res){
      res.render('index.ejs');
    });


    //route for google+
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profgmail',
                    failureRedirect : '/'
            }));
    //route for processing showing the profile page
    app.get('/profgmail', isLoggedIn, function(req, res) {

        res.render('profgmail.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/proffacebook', isLoggedIn, function(req, res) {

        res.render('proffacebook.ejs', {
            user : req.user // get the user out of session and pass to template
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
        passport.authenticate('facebook', {successRedirect : '/proffacebook',
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
