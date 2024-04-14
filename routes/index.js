var express = require('express');
var router = express.Router();
var userModel = require("./users")


router.get('/', function (req, res) {
  res.render('index', { nav: true, loggedIn: false });
});

router.get('/project', function (req, res) {
  res.render('projects', { nav: true, loggedIn: false });
});

router.get('/uploadProject', function (req, res) {
  res.render('uploadProject', { nav: false, loggedIn: false });
});

router.post('/uploadProject', function (req, res) {
  res.redirect('/verify')
});

router.get('/verify', function (req, res) {
  res.render('verification', { nav: false, loggedIn: false });
});

router.post('/verify', function (req, res) {
  res.redirect('/form')
});

router.get('/form', function (req, res) {
  res.render('form', { nav: false, loggedIn: false });
});


router.get('/projectUploaded', function (req, res) {
  res.render('projectUploaded', { nav: false, loggedIn: false });
});


router.post('/submitForm', function (req, res) {
  const projectData = req.body;
  console.log(projectData); // Log the received form data
  res.json({success:true,message:"form submitted"})
});

router.get('/signup', function (req, res) {
  res.render('signup', { nav: false, loggedIn: false });
});


router.post('/signup', async function (req, res) {
  console.log(req.body);
  
  let random = Math.floor(Math.random() * 16);
  let avatarUrl = await fetch(`https://api.dicebear.com/7.x/lorelei/svg?seed=${random}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error fetching avatar: ${res.statusText}`);
      }
      return res.url;
    })
    .catch((error) => {
      console.error(error);
    });

  // Create a new user with the avatar URL
  let user = await userModel.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    avatar: avatarUrl // Assign the generated avatar URL
  });
  await user.save();
  console.log(user.avatar)

  res.send("submitted");
});



router.get('/login', function (req, res) {
  res.render('login', { nav: false, loggedIn: true });
});

router.get('/aboutus', function (req, res) {
  res.render('aboutus', { nav: true, loggedIn: false });
})


router.get('/contact', function (req, res) {
  res.render('contact', { nav: true, loggedIn: true });
});


router.get('/forgotpsswd',(req,res)=>{
 res.render('forgotpsswd', { nav: false, loggedIn: true });
})

router.get('/verifypsswd',(req,res)=>{
 res.render('verifyemailpsswd', { nav: false, loggedIn: true });
})

router.get('/createpsswd',(req,res)=>{
 res.render('createpsswd', { nav: false, loggedIn: true });
})


module.exports = router;
