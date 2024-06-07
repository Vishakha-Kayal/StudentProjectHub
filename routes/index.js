var express = require('express');
var router = express.Router();
var userModel = require("./users")
var projectModel = require("./project")
var commentModel = require("./comment")
var collaborateModel = require('./collaboration')
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const upload = require("./multer");
const review = require('./comment');
const contact = require('./contact');

dotenv.config({
  path: './.env'
})

let verificationCode = ""
let msg = ""

async function sendMail(email) {

  // Configure nodemailer with secure settings
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: 'studentprojecthub11@gmail.com',  // This may need to be the authorized sender by 'smtp-relay.brevo.com'
      pass: process.env.SECRET_KEY,
    },
  });

  // Temporary storage for verification codes (replace with a database)
  // const verificationCodes = new Map();
  // console.log("verificationCodes = ",verificationCodes);
  const code = generateRandomCode();

  try {
    // Removed the testAccount creation as it's not being used

    let info = await transporter.sendMail({
      from: 'studentprojecthub11@gmail.com', // corrected sender address
      to: email,
      subject: 'Your Access Verification Code',
      text: `We hope this message finds you well. As part of our commitment to ensuring the security of your account, we are providing you with a verification code. Please use the code below to complete the verification process:

      Verification Code: ${code}
      
      If you have any questions or concerns, please don't hesitate to reach out to our support team. We're here to help!`,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return code;

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

/* GET home page. */
router.get('/', function (req, res) {
  loggedIn = req.session.loggedIn
  // console.log(loggedIn);
  const avatar = req.session.avatar
  console.log(avatar);
  res.render('index', { nav: true, loggedIn: loggedIn, avatar: avatar });
});

router.get('/project', async function (req, res) {
  loggedIn = req.session.loggedIn || false;
  try {
    const project = await projectModel.find().populate("createdBy");
    console.log("loggedInValue tru", req.session.loggedIn)
    res.render('projects', { nav: true, loggedIn: req.session.loggedIn, projects: project, avatar: req.session.avatar, review: "" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error as JSON
  }
});


async function sendColabMail(userEmail, recieveremail) {

  // Configure nodemailer with secure settings
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: 'studentprojecthub11@gmail.com',  // This may need to be the authorized sender by 'smtp-relay.brevo.com'
      pass: process.env.SECRET_KEY,
    },
  });

  // Temporary storage for verification codes (replace with a database)
  // const verificationCodes = new Map();
  // console.log("verificationCodes = ",verificationCodes);

  try {
    // Removed the testAccount creation as it's not being used

    let info = await transporter.sendMail({
      from: userEmail, // corrected sender address
      to: recieveremail,
      subject: 'We want to collaborate with you.',
      text: `We hope this message finds you well. As part of our commitment to ensuring the security of your account, we are providing you with a verification code. Please use the code below to complete the verification process:      
      If you have any questions or concerns, please don't hesitate to reach out to our support team. We're here to help!`,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error(error);
    // res.status(500).send('Internal Server Error');
  }

}

router.post('/collaborate', isAuthenticated, async function (req, res) {
  console.log(req.body);
  const { projectId } = req.body;
  console.log("clicked");
  const user = await userModel.findOne({ username: req.session.username });
  if (!user) {
    res.status(500).send("something went wrong")
  }
  try {

    const collaborate = await collaborateModel.create({
      collabReqSend: user._id,
      collabReqRec: projectId,
      reqResponse: null,
    })

    const project = await projectModel.findOne({ _id: projectId }).populate("createdBy");
    console.log("p", project);
    let userEmail = user.universityEmail;
    let recieveremail = project.createdBy.universityEmail;
    await project.collaboration.push(collaborate._id);
    project.save();
    sendColabMail(userEmail, recieveremail);
    console.log("user email", userEmail)
    console.log("reciever email", recieveremail)
  }
  catch (e) {
    console.log(e);
  }
})

router.post('/colabResponse', isAuthenticated, async function (req, res) {
  console.log("req.body", req.body);
})

router.get("/collaborationData", async (req, res) => {
  const colabData = await collaborateModel.find();
  res.json(colabData);
})

router.get('/projectData', async (req, res) => {
  const project = await projectModel.find().populate('createdBy');
  const user = await userModel.findOne({ username: req.session.username });
  res.json({ project, user });
});

router.get("/dashboard", isAuthenticated, async (req, res) => {
  const project = await userModel.findOne({ username: req.session.username }).populate('projects');
  console.log("project", project);
  res.render("dashboard", { nav: false, loggedIn: req.session.loggedIn, user: project, avatar: req.session.avatar })
})

router.get("/dashboard/notifications/comments", isAuthenticated, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.username });
  const review = await commentModel.find()
    .populate('senderName receiverDetail');
  console.log("project_user_id", review)
  res.render("notifications", { nav: false, loggedIn: req.session.loggedIn, avatar: req.session.avatar, review: review, user })
})

router.get("/dashboard/notifications/collaboration", isAuthenticated, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.username });
  const colab = await collaborateModel.find()
    .populate('collabReqRec collabReqSend');
  // res.json(colab)
  res.render("notificationcollaborate", { nav: false, loggedIn: req.session.loggedIn, avatar: req.session.avatar, colab, user })
})


router.get("/dashboard/queries", isAuthenticated, async (req, res) => {
  res.render("queries", { nav: false, loggedIn: req.session.loggedIn, avatar: req.session.avatar })
})

router.get("/admin", async (req, res) => {
  const contacT = await contact.find();
  res.render("admin", { nav: false})
})

router.post("/admin", async function (req, res) {
  const { adminusername } = await req.body;
  const contacT = await contact.find();
  if (adminusername == process.env.ADMIN_USERNAME) {
    req.session.adminusername = adminusername;
    req.session.isAdmin = true;
    res.render('adminresolve',{ nav: false ,contact:contacT})
  }
  else{
    req.session.isAdmin = false;
  }
})

router.get("/adminresolve", isAdmin,async (req, res) => {
  const contacT = await contact.find();
  res.render("adminresolve", { nav: false ,contact:contacT})
})

router.post("/adminresolve/:queryid", async (req, res) => {
  const contacT = await contact.find();
  const {response} =req.body;
  const queryId = req.params.queryid
  let contactModel = await contact.findOne({_id:queryId});
  contactModel.queryResolved=response;
  contactModel.save();
  res.render('adminresolve',{ nav: false ,contact:contacT});
})


// router.get('/dashboard', function (req, res) {
//   res.render('dashboard', { nav: true, loggedIn: true });
// });

// router.get('/notifications', function (req, res) {
//   res.render('notifications', { nav: false, loggedIn: true ,avatar:req.session.avatar});
// });

router.get("/comments", async (req, res) => {
  const review = await commentModel.find()
    .populate('senderName receiverDetail');
  res.json(review);
})

router.post('/comments', isAuthenticated, async function (req, res) {
  const { comment, projectId } = req.body
  const user = await userModel.findOne({ username: req.session.username });
  try {
    const review = await commentModel.create({
      reviewContent: comment,
      senderName: user._id,
      receiverDetail: projectId,
    })
    res.render("project")
  }
  catch (e) {
    console.log(e);
  }

})

// const project = await projectModel.find().populate('createdBy')
//   loggedIn=req.session.loggedIn
//   console.log(project);
//   res.render('project',{project,nav:true,loggedIn:loggedIn});

router.get('/uploadProject', isAuthenticated, async function (req, res) {

  const user = await userModel.findOne({
    username: req.session.username,
  });
  if (user) {
    if (user.universityEmail) {
      res.redirect("/form")
    }
    else {
      res.render("uploadProject", { nav: false, loggedIn: false })
    }
  }
  else {
    res.render("uploadProject", { nav: false, loggedIn: false })
  }
});

router.post('/uploadProject', async function (req, res) {
  const { email } = req.body;
  try {
    verificationCode = await sendMail(email)
    console.log("verificationCode =", verificationCode);
    let username = req.session.username;
    const user = await userModel.findOne({ username: username })

    if (user.universityEmail === email) {
      throw new Error("Enter unique email, email already exists.");
    }

    user.universityEmail = email;
    await user.save();
    res.redirect('/verify');
  }
  catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

router.get('/verify', function (req, res) {
  res.render('verification', { nav: false, loggedIn: false });
});

router.post('/verify', function (req, res) {
  const { otp_input1, otp_input2, otp_input3, otp_input4 } = req.body;
  let userInput = otp_input1 + otp_input2 + otp_input3 + otp_input4;
  if (userInput === verificationCode) {
    res.redirect('/form')
  }
  else {
    res.redirect('/');
  }

  res.redirect('/form')
});

router.get('/form', function (req, res) {
  res.render('form', { nav: false, loggedIn: false });
});

router.get('/projectUploaded', function (req, res) {
  res.render('projectUploaded', { nav: false, loggedIn: true });
});

router.post('/form', isAuthenticated, function (req, res) {
  res.redirect('/projectUploaded')
});

router.post('/submitForm', upload.fields([{ name: 'projectImages' }, { name: 'universityLogo' }]), async function (req, res) {
  let projectImages = req.files['projectImages'];
  let universityLogo = req.files['universityLogo'];

  const user = await userModel.findOne({
    username: req.session.username,
  });

  // console.log("req.files", req.files)
  // console.log("projectImages", projectImages);
  // console.log("universityLogo", universityLogo);

  let inputData = req.body;
  const students = [];

  for (let i = 1; inputData[`studentName_${i}`]; i++) {
    const student = {
      studentName: inputData[`studentName_${i}`],
      studentStream: inputData[`studentStream_${i}`],
      yearOfQualification: inputData[`yearOfQualification_${i}`]
    };
    students.push(student);
  }
  const projectImagesArr = []
  await projectImages.forEach((image) => {
    let file = image.filename
    projectImagesArr.push(file)
  })

  const { projectTitle, projectCategory, universityName, projectDescription } = req.body
  const approvedProjectt = true
  const projectData = await projectModel.create({
    projectTitle: projectTitle,
    projectCategory: projectCategory,
    projectDescription: projectDescription,
    projectImages: projectImagesArr,
    universityName: universityName,
    universityLogo: universityLogo[0].filename,
    student: students,
    approvedproject: approvedProjectt,
    createdBy: user._id,
    collaboration: [],
  })
  user.projects.push(projectData._id)
  await user.save();
  // console.log("form-data", inputData);
  // console.log("students data", students);
  // console.log("project data", projectData);
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
        avatar: avatarUrl,
        universityEmail: ""
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
    res.redirect("/signup");
  }
  // Create a new user with the avatar URL
});

router.get('/login', function (req, res) {
  res.render('login', { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: false, passwordReseted: false });
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body
  // console.log(username);
  // console.log(email);

  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

  if (!user) {
    res.render("login", { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: true, passwordReseted: false });

  }

  else {
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.render("login", { nav: false, loggedIn: false, InvalidPassword: true, userNotFound: false, passwordReseted: false });
    }
    else {
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.avatar = user.avatar;
      res.redirect('/');
    }
  }
})


router.get('/aboutus', function (req, res) {
  res.render('aboutus', { nav: true, loggedIn: false });
});

router.get('/contact', function (req, res) {
  res.render('contact', { nav: true, loggedIn: false });
});

router.post("/contactUs", async function (req, res) {
  const { firstName, lastName, usermail, query } = req.body;
  const contactUser = await contact.create({
    firstName: firstName,
    lastName: lastName,
    email: usermail,
    userIssue: query,
    queryResolved: ""
  })
  await contactUser.save();
  res.render('contact', { nav: true, loggedIn: false });

});

router.get('/forgotpsswd', function (req, res) {
  res.render('forgotpsswd', { nav: false, loggedIn: false });
});


router.post('/forgotpsswd', async function (req, res) {
  const { username, email } = req.body
  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] })

  if (!user) {
    res.render("login", { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: true });

  }
  else {
    req.session.username = user.username
    verificationCode = await sendMail(user.email)
    // console.log("result code is = ",result);
    res.redirect('verifypage')
  }
})

router.get('/verifypage', function (req, res) {
  res.render('verifypage', { nav: false, loggedIn: false, invalidOtp: false });
});
router.post('/verifypage', function (req, res) {
  const { otp_input1, otp_input2, otp_input3, otp_input4 } = req.body;
  console.log("verificationCode IS ", verificationCode);
  console.log("type of verificationCode IS ", typeof (verificationCode));

  const userInput = otp_input1 + otp_input2 + otp_input3 + otp_input4
  if (userInput === verificationCode) {
    res.redirect('/createpsswd')
  }
  else {
    res.render('verifypage', { nav: false, loggedIn: false, invalidOtp: true });
  }

});


router.get('/createpsswd', function (req, res) {
  res.render('createpsswd', { nav: false, loggedIn: false });
});

router.post('/createpsswd', async function (req, res) {
  const { confirmPassword } = req.body;
  try {
    const user = await userModel.findOne({ username: req.session.username })
    if (!user) {
      return res.status(404).send('User not found');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(confirmPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.render('login', { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: false, passwordReseted: true })
  }

  catch (error) {
    res.status(500).send('Internal server error'); // Or redirect to an error page
  }

});

router.get("/logout", function (req, res, next) {
  req.session.loggedIn = false;
  res.redirect('/')
});

function isAdmin(req, res, next) {
  if (req.session.isAdmin) {
    return next();
  } else {
    res.status(401).send('Unauthorized: Access denied');
  }
}

function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/signup');
  }
}


module.exports = router;

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