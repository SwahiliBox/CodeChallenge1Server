var express    =  require('express');
var router     =  express.Router();
var cors       =  require('cors');
var Event      =  require('../../app/models/event');

module.exports =  function(app,passport){

  app.use(cors());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("This should be working");
    next();
  });

  app.get('/error',function(req,res){
    res.send('1');
  });

  /* home route  */
  app.get('/', function(req, res){
    var events = {};
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('index',{
          events: events 
      });
      console.log(events);
    });
  });

  //send events to admin page
  app.get('/admin', isLoggedIn, function(req, res){
    Event.find({}, function(error, events){
      if(error) res.send(error);
      res.render('admin/index', {
          title  : 'Dashboard Home',
          page   : 'dashboard',
          events : events
      });
    });
  });

  //Send file crud.html
  app.get('/crud', function(request, response){
    response.sendFile('crud.html', {'root': 'views'});
  });
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  req.session.returnTo = req.path; 
  res.redirect('/login');
}
