var express = require('express');
var router = express.Router();
var userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{nav:true});
});

router.get('/project', function(req, res) {
  res.render('projects',{nav:true});
});

router.get('/uploadProject', function(req, res) {
  res.render('uploadProject',{nav:false});
});

router.post('/uploadProject', function(req, res) {
 res.redirect('/verify')
});

router.get('/verify', function(req, res) {
  res.render('verification',{nav:false});
});

router.post('/verify', function(req, res) {
  res.redirect('/uploadProject')
});

router.post("/register" , async function(req,res){
  var userdata= new userModel({
    username:req.body.username,
    password:req.body.password,
    email: req.body.email
  })
  await userdata.save();
  res.send("created")
})



module.exports = router;
