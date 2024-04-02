var express = require('express');
var router = express.Router();
var userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{nav:true , loggedIn:false});
});

router.get('/project', function(req, res) {
  res.render('projects',{nav:true , loggedIn:false});
});

router.get('/uploadProject', function(req, res) {
  res.render('uploadProject',{nav:true , loggedIn:false});
});

router.post('/uploadProject', function(req, res) {
 res.redirect('/verify')
});

router.get('/verify', function(req, res) {
  res.render('verification',{nav:true , loggedIn:false});
});

router.post('/verify', function(req, res) {
  res.redirect('/form')
});

router.get('/form', function(req, res) {
  res.render('form',{nav:true , loggedIn:false});
});


router.get('/projectUploaded', function(req, res) {
  res.render('projectUploaded',{nav:true , loggedIn:false});
});


router.post('/submitForm', function(req, res) {
  const projectData = req.body;
  console.log(projectData); // Log the received form data
});

router.get('/signup', function(req, res) {
  res.render('signup',{nav:false , loggedIn:false});
});

router.post('/signup', function(req, res) {
  console.log(req.body);
  res.send("submited")
});


router.get('/login', function(req, res) {
  res.render('login',{nav:true , loggedIn:false});
});

router.get('/aboutus',function(req, res) {
  res.render('aboutus',{nav:true , loggedIn:false});
})


router.get('/contact', function(req, res) {
  res.render('contact',{nav:true , loggedIn:true});
});


module.exports = router;
