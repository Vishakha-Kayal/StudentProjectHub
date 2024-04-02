var express = require('express');
var router = express.Router();
var userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index',{nav:true,loggedIn:false});
});

router.get('/project', function(req, res) {
  res.render('project',{nav:true});
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



router.post('/form', function(req, res) {
  res.redirect('/projectUploaded')
});

router.post('/submitForm', function(req, res) {
  const projectTitle = req.body;
  console.log(projectTitle);
  res.json({sucess:true,message:"Form submitted successfully"});
}); 

router.get('/signup', function(req, res) {
  res.render('signup',{nav:false});
});

router.post('/api/user/signup', async function(req, res) {
  try {
    const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, // Consider hashing the password
    });
    const savedUser = await newUser.save();
    
    // Respond with the user ID (or another unique identifier)
    res.status(201).json({ userId: savedUser._id });
} catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
}
// res.redirect("/")
});

router.put('/api/user/:userId/avatar', async (req, res) => {
  const { userId } = req.params;
  const { avatar } = req.body;
  console.log(userId);
  try {
      // Find the user by ID and update the avatar
      const updatedUser = await userModel.findByIdAndUpdate(userId, { avatar }, { new: true });
      
      if (!updatedUser) {
          return res.status(404).send({ message: 'User not found' });
      }

      res.send({ message: 'Avatar updated successfully', user: updatedUser });
  } catch (error) {
      res.status(400).send({ message: 'Error updating avatar', error: error.message });
  }
});

router.get('/login', function(req, res) {
  res.render('login',{nav:false});
});

router.get('/dashboard', function(req, res) {
  res.render('dashboard',{nav:true ,loggedIn:true});
});

router.get('/about', function(req, res) {
  res.render('about',{nav:true});
});

router.get('/contact', function(req, res) {
  res.render('contact',{nav:true});
});






module.exports = router;
