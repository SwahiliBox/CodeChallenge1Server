<<<<<<< HEAD
=======
var express= require('express');
var router=express.Router();
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.get('/login', function(req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));

    app.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
      app.post('/signup', passport.authenticate('local-signup', {
          successRedirect : '/profile',
          failureRedirect : '/signup',
          failureFlash : true
    }));

    app.get('/eventsrecords', function(req, res) {
        res.render('eventsrecords.ejs', { message: req.flash('signupMessage') });
        });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
        });
    };

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
>>>>>>> b3fb236e39c14c5ee9ff98905cf78166e5a960e3
