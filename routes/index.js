var express = require('express');
var router = express.Router();
var userModel = require("./users")
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

let msg = ""

async function sendMail(email) {

  // Configure nodemailer with secure settings
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: 'studentprojecthub11@gmail.com',  // This may need to be the authorized sender by 'smtp-relay.brevo.com'
      pass: 'xsmtpsib-c5e4b0d9f37edda8c1121a470ecda5f4dd1b1c722cb753ccc46cf37bb8808950-3IrtXzZE0DhP6VC7',
    },
  });

  // Temporary storage for verification codes (replace with a database)
  // const verificationCodes = new Map();
  const code = generateRandomCode();

  try {
    // Removed the testAccount creation as it's not being used

    let info = await transporter.sendMail({
      from: 'studentprojecthub11@gmail.com', // corrected sender address
      to: email,
      subject: 'Hello, this is a check mail',
      text: `Your verification number is:${code}`,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // await res.json(info);
  } catch (error) {
    console.error(error);
    // res.status(500).send('Internal Server Error');
  }
}

function generateRandomCode() {
  const randomNum = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  return randomNum.toString();
}


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your email provider's SMTP host
  port: 587, // Replace with your email provider's port
  secure: false, // Use TLS for Gmail
  auth: {
    user: 'kayalvishakha@gmail.com', // Replace with your email address
    pass: '2factorAuthentication@lol' // Replace with your email password
  }
});

/* GET home page. */
router.get('/', function (req, res) {
  loggedIn = req.session.loggedIn
  const avatar = req.session.avatar
  console.log(avatar);
  res.render('index', { nav: true, loggedIn: loggedIn, avatar: avatar });
});

router.get('/project', function (req, res) {
  res.render('projects', { nav: true, loggedIn: false });
});

router.get('/uploadProject', isAuthenticated, function (req, res) {
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

router.get('/form', isAuthenticated, function (req, res) {
  res.render('form', { nav: false, loggedIn: false });
});


router.get('/projectUploaded', isAuthenticated, function (req, res) {
  res.render('projectUploaded', { nav: false, loggedIn: false });
});



router.post('/form', isAuthenticated, function (req, res) {
  res.redirect('/projectUploaded')
});

router.post('/submitForm', function (req, res) {
  const projectTitle = req.body;
  const file = req.file;
  console.log(projectTitle);
  console.log(file);
  res.json({ sucess: true, message: "Form submitted successfully" });
});

router.get('/signup', function (req, res) {
  res.render('signup', { nav: false, loggedIn: false, userExist: false, message: msg });
});

router.post('/signup', async function (req, res) {
  const { username, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ username: username });
    // let userExist=false;
    if (existingUser) {
      // userExist=true;
      msg = "Username already exists"
      res.render('signup', { nav: false, loggedIn: false, userExist: userExist, message: msg });
    }

    else {
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
      const salt = await bcrypt.genSalt(7);
      const hashedPassword = await bcrypt.hash(password, salt);
      let user = await userModel.create({
        username: req.body.username,
        email: email,
        password: hashedPassword,
        avatar: avatarUrl // Assign the generated avatar URL
      });
      await user.save();
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.avatar = user.avatar;
      console.log(user.avatar)

      res.redirect("/");
    }
  }
  catch (error) {
    console.error('Error saving user:', error);
    // Handle errors appropriately
    res.redirect("/signup");
  }
  // Create a new user with the avatar URL
});

// router.post('/api/user/signup', async function(req, res) {
//   try {
//     const newUser = new userModel({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password, // Consider hashing the password
//     });
//     const savedUser = await newUser.save();

//     // Respond with the user ID (or another unique identifier)
//     res.status(201).json({ userId: savedUser._id });
// } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error: error.message });
// }
// // res.redirect("/")
// });

// router.put('/api/user/:userId/avatar', async (req, res) => {
//   const { userId } = req.params;
//   const { avatar } = req.body;
//   console.log(userId);
//   try {
//       // Find the user by ID and update the avatar
//       const updatedUser = await userModel.findByIdAndUpdate(userId, { avatar }, { new: true });

//       if (!updatedUser) {
//           return res.status(404).send({ message: 'User not found' });
//       }

//       res.send({ message: 'Avatar updated successfully', user: updatedUser });
//   } catch (error) {
//       res.status(400).send({ message: 'Error updating avatar', error: error.message });
//   }
// });

router.get('/login', function (req, res) {
  res.render('login', { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: false });
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body
  console.log(username);
  console.log(email);

  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

  if (!user) {
    res.render("login", { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: true });

  }

  else {
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.render("login", { nav: false, loggedIn: false, InvalidPassword: true, userNotFound: false });
    }
    else {
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.avatar = user.avatar;
      res.redirect('/');
    }
  }
})

router.get('/dashboard', isAuthenticated, function (req, res) {
  res.render('dashboard', { nav: true, loggedIn: true });
});

router.get('/about', function (req, res) {
  res.render('aboutus', { nav: true, loggedIn: false });
});

router.get('/contact', function (req, res) {
  res.render('contact', { nav: true, loggedIn: false });
});

router.get('/forgotpsswd', function (req, res) {
  res.render('forgotpsswd', { nav: false, loggedIn: false });
});

router.post('/forgotpsswd', async function(req,res){
  const { username,email } = req.body
  const result = await sendMail(email)
  console.log(result);
  res.redirect('/verifypage')
})

router.get('/verifypage',  function (req, res) {
  res.render('verifypage', { nav: false, loggedIn: false });
});

router.get('/createpsswd',  function (req, res) {
  res.render('createpsswd', { nav: false, loggedIn: false });
});

router.get("/logout", function (req, res, next) {
  req.session.loggedIn = false;
  res.redirect('/')
});


function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/signup')
  }
}


module.exports = router;
