var express = require('express');
var router = express.Router();
var userModel = require("./users")//import

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res, next) {
  res.render('index2');
});

router.post("/register",function(req,res){
  var userdata = new userModel({
    username:req.body.username,
    password:req.body.password,
    email:req.body.email
  })

})
module.exports = router;
