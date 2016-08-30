var express       =  require('express');
var app           =  express();
var router        =  express.Router();
var cors          =  require('cors');

var eventRoutes   =  require('./events');
var userRoutes    =  require('./user');
var sessionRoutes =  require('./session');
var adminRoutes   =  require('./admin');
var homeRoutes    =  require('./home');

/*
 * @isLoggedIn function checks to see if user is 
 * logged in if not, renders the login page
*/

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path;
  res.redirect('/login');
}

/*
 * home route and admin root route
*/
router.get('/', homeRoutes.index);
router.get('/admin', isLoggedIn, adminRoutes.index);

/* 
 * event routes 
*/
router.get('/events',                                eventRoutes.index);
router.get('/admin/events',                          eventRoutes.index);
router.get('/admin/events/edit/:slug',    isLoggedIn,  eventRoutes.edit);
router.get('/admin/events/new',           isLoggedIn,  eventRoutes.new);
router.get('/admin/events/:id',           isLoggedIn,  eventRoutes.show);
router.get('/admin/events/delete/:id',    isLoggedIn,  eventRoutes.delete);
router.post('/admin/events/',             isLoggedIn,  eventRoutes.create);
router.post('/admin/events/update/:id',   isLoggedIn,  eventRoutes.update);

/*
 * @user routes
*/
router.get('/signup',           userRoutes.new);
router.post('/users/create',    userRoutes.create);

/*
 * @session routes 
*/
router.get('/login',           sessionRoutes.new);
router.post('/session/create', sessionRoutes.create);
router.get('/logout',          sessionRoutes.delete);

module.exports = router;
