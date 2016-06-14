var express= require('express');
var router=express.Router();
//get Homepage
router.get('/',function(req,res){
  res.render('index.html');
});
module.exports=router;
