var express       =  require('express');
var router        =  express.Router();
var eventRoutes   =  require('./events');
var userRoutes    =  require('./user');
var sessionRoutes =  require('./session');
var adminRoutes   =  require('./admin');
var homeRoutes    =  require('./home');
var rsvpRoutes    =  require('./rsvp');
var roleRoutes    =  require('./role');
var userwebRoutes    =  require('./userweb');
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
 * role routes to create and assign roles
*/ 
router.get('/roles/:role',  roleRoutes.create);
router.get('/role/:username/:role', roleRoutes.assign);

/*
 * home route and admin root route
*/
router.get('/', homeRoutes.index);
router.get('/admin', isLoggedIn, adminRoutes.index);
router.get('/api/events', homeRoutes.index);

/* 
 * event routes 
*/
router.get('/admin/events',               isLoggedIn,  eventRoutes.index);
router.get('/admin/events/edit/:slug',    isLoggedIn,  eventRoutes.edit);
router.get('/admin/events/new',           isLoggedIn,  eventRoutes.new);
router.get('/admin/events/:slug',         isLoggedIn,  eventRoutes.show);
router.get('/admin/events/delete/:slug',  isLoggedIn,  eventRoutes.delete);
router.post('/admin/events/',             isLoggedIn,  eventRoutes.create);
router.post('/admin/events/update/:slug', isLoggedIn,  eventRoutes.update);
router.get('/events',                     isLoggedIn,  eventRoutes.get);

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
router.post('/usercreate',     sessionRoutes.usercreate); 
/*
 * @rsvp routes
*/
router.get('/rsvps',  rsvpRoutes.index);
router.post('/rsvps', rsvpRoutes.create);
/*
 * @webuser routes
*/
router.get('/user',    userwebRoutes.userindex);
module.exports = router;
