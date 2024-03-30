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
  res.redirect('/form')
});

router.get('/form', function(req, res) {
  res.render('form',{nav:false});
});


router.get('/projectUploaded', function(req, res) {
  res.render('projectUploaded',{nav:false});
});


router.post('/submitForm', function(req, res) {
  const projectData = req.body;
  console.log(projectData); // Log the received form data
  res.json({ success: true, message: 'Form submitted successfully' });
});

router.get('/signup', function(req, res) {
  res.render('signup',{nav:false});
});

router.get('/login', function(req, res) {
  res.render('login',{nav:false});
});

router.get('/aboutus',function(req, res) {
  res.render('aboutus',{nav:false});
})



module.exports = router;
