var express= require('express');
var router=express.Router();
var cors   = require('cors');

module.exports = function(app,passport){
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
  res.render('index');
});

app.get('/secure', function(req, res){
  res.render('secure');
});

app.get('/admin', function(req, res){
  res.render('admin/index', {
      title: 'Dashboard Home',
      page: 'dashboard'
  });
});

//Send file crud.html
app.get('/crud', function(request, response){
  response.sendFile('crud.html', {'root': 'views'});
});
};
