var user = require('./models/user.js');
module.exports = function(app, passport) {
	 app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    	 // show the login form
        app.get('/login', function(req, res) {
           res.render('login.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    app.get('/signup',function(req,res){
      res.render('signup.ejs',{message:req.flash('signupMessage')});
    });

    app.post('/signup',passport.authenticate('local-signup',{
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //profile
     app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/:username/:email/:password',function(req,res){
      var newUser=new User();
      newUser.local.username = req.params.username;
      newUser.local.email = req.params.email;
      newUser.local.password=req.params.password;
      console.log(newUser.local.username +" "+newUser.local.email+" "+newUser.local.password);
      newUser.save(function(err){
        if(err) throw err;
      });
      res.send("Success");
    });
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
