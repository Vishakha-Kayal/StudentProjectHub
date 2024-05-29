var express = require('express');
var router = express.Router();
var userModel = require("./users")
var projectModel = require('./project');
var commentModel = require('./comment');
var contactModel = require('./contact');
var collaborationModel = require('./collaboration');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv")
const upload = require("./multer");

dotenv.config({
  path: './.env'
})

let verificationCode = "";


async function sendMail(email) {

  // Configure nodemailer with secure settings
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: 'studentprojecthub11@gmail.com',  // This may need to be the authorized sender by 'smtp-relay.brevo.com'
      pass: `${process.env.SECERT_KEY}`,
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

async function sendCollabRequest(receiverMail, senderMail) {
  // Configure nodemailer with secure settings
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: 'studentprojecthub11@gmail.com',  // This may need to be the authorized sender by 'smtp-relay.brevo.com'
      pass: `${process.env.SECERT_KEY}`,
    },
  });

  try {


    let info = await transporter.sendMail({
      from: 'studentprojecthub11@gmail.com', // corrected sender address
      to: receiverMail,
      subject: `Collaboration Request From ${senderMail}`,
      text: `Collaboration Request from ${senderMail}`,
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

/* GET home page. */
router.get('/', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  const avatar = req.session.avatar
  res.render('index', { nav: true, loggedIn: req.session.loggedIn, avatar: avatar, user });
});

router.get('/project', async function (req, res) {
  try {
    const user = await userModel.findOne({ username: req.session.username });
    const project = await projectModel.find().populate('createdBy');
    const review = await commentModel.find().populate('senderName receiverDetail');
    res.render('project', { project, review, nav: true, loggedIn: req.session.loggedIn, avatar: req.session.avatar, user });
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/projectData', async (req, res) => {
  const project = await projectModel.find().populate('createdBy').populate('collaborations');
  const user = await userModel.findOne({ username: req.session.username });
  res.json({ project, user });
});
router.get('/reviewData', async (req, res) => {
  const review = await commentModel.find().populate('senderName receiverDetail');
  res.json(review);
});

router.post('/comments', isAuthenticated, async function (req, res) {
  const project = await projectModel.find().populate('createdBy')
  const { comment, projectId } = req.body
  const user = await userModel.findOne({ username: req.session.username });
  try {
    await commentModel.create({
      reviewContent: comment,
      senderName: user._id,
      receiverDetail: projectId,
    })
    const review = await commentModel.find().populate('senderName receiverDetail');
    res.json(review);

  }
  catch (e) {
    console.log(e);
  }

})

router.post('/collaborate', async function (req, res) {
  const collabProjectId = req.body; // Assuming the ID is sent under the key 'collabProjectId'
  const user = await userModel.findOne({ username: req.session.username });
  let project = await projectModel.findOne({ _id: collabProjectId.id }).populate('createdBy').populate('collaborations');
  let collabReqReceiver = project.createdBy.universityEmail;
  let collabReqSender = user.email;
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  else {
    const collaboration = await collaborationModel.create({
      collabReqRec: project._id,
      collabReqSend: user._id,
      reqResponse:""
    });
    project.collaborations.push(collaboration._id)
    await project.save();
    sendCollabRequest(collabReqReceiver, collabReqSender)
    project = await projectModel.findOne({ _id: collabProjectId.id }).populate('createdBy').populate('collaborations');
  }

  res.json({ success: true, message: "Collaboration initiated successfully", project });
})



router.get('/uploadProject', isAuthenticated, async function (req, res) {
  let username = req.session.username;
  console.log(username);
  const user = await userModel.findOne({ username: username })
  console.log(user.universityEmail);
  if (user) {
    if (user.universityEmail) {
      res.redirect("/form")
    }
    else {
      res.render('uploadProject', { nav: false, loggedIn: false, user });
    }
  }
  else {
    res.render('uploadProject', { nav: false, loggedIn: false, user });
  }
});

router.post('/uploadProject', async function (req, res) {
  const { universityEmail } = req.body;
  try {
    verificationCode = await sendMail(universityEmail)
    let username = req.session.username;
    const user = await userModel.findOne({ username: username })

    if (user.universityEmail === universityEmail) {
      throw new Error("Enter unique email, email already exists.");
    }

    user.universityEmail = universityEmail;
    await user.save();
    console.log("user=", user);
    res.redirect('/verify');
  }
  catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }

  //   verificationCode = await sendMail(universityEmail);
  //   let username = req.session.username;
  //   const user = await userModel.findOne({username:username})
  //   user.universityEmail = universityEmail;
  //   await user.save();
  //   console.log(verificationCode);

  //  res.redirect('/verify')
});

router.get('/verify', isAuthenticated, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('verification', { nav: false, loggedIn: false, invalidOtp: false, user });
});

router.post('/verify', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  const { otp_input1, otp_input2, otp_input3, otp_input4 } = req.body;
  let otp = otp_input1 + otp_input2 + otp_input3 + otp_input4;
  console.log("otp", otp);
  console.log(verificationCode);
  if (otp == verificationCode) {
    res.redirect('/form')
  }
  else {
    res.render('verify', { nav: false, loggedIn: false, invalidOtp: true, user });
  }

});

router.get('/form', isAuthenticated, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('form', { nav: false, loggedIn: false, user });
});


router.post('/submitForm', upload.fields([{ name: 'projectImages' }, { name: 'universityLogo' }]), async function (req, res) {
  const projectImages = req.files['projectImages'];
  const universityLogo = req.files['universityLogo'];
  const user = await userModel.findOne({ username: req.session.username });

  let projectImagesFilename = []
  projectImages.forEach(element => {
    let filename = element.filename
    projectImagesFilename.push(filename)
  });

  let UniversityImageFilename = ""
  universityLogo.forEach(element => {
    let filename = element.filename
    UniversityImageFilename = filename

  });


  const { projectTitle, projectDescription, universityName, projectCategory } = req.body
  const approvedProject = true
  const inputData = req.body;

  const students = [];

  for (let i = 1; inputData[`studentName_${i}`]; i++) {
    const student = {
      studentName: inputData[`studentName_${i}`],
      studentStream: inputData[`studentStream_${i}`],
      yearOfQualification: inputData[`yearOfQualification_${i}`]
    };
    students.push(student);
  }

  let project = await projectModel.create({
    createdBy: user._id,
    projectTitle: projectTitle,
    projectDescription: projectDescription,
    universityName: universityName,
    projectCategory: projectCategory,
    approvedProject: approvedProject,
    projectImages: projectImagesFilename,
    universityLogo: UniversityImageFilename,
    student: students,
    collaborations: []
  });

  user.projects.push(project._id)
  await user.save();

  res.json({ sucess: true, message: "Form submitted successfully" });
});

router.get('/projectUploaded', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('projectUploaded', { nav: false, loggedIn: false, user });
});

router.get('/signup', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('signup', { nav: false, loggedIn: false, userExist: false, user });
});

router.post('/signup', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  const { username, email, password } = req.body;
  const universityEmail = "";
  try {
    const existingUser = await userModel.findOne({ username: username });
    let userExist = false;
    if (existingUser) {
      userExist = true;
      res.render('signup', { nav: false, loggedIn: false, userExist: userExist, user });
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
        universityEmail: universityEmail // Assign the generated avatar URL
      });
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.avatar = user.avatar;

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

router.get('/login', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('login', { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: false, passwordReseted: false, user });
});

router.post('/login', async (req, res) => {
  const { username, email, password } = req.body
  const userData = await userModel.findOne({ username: req.session.username });

  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });

  if (!user) {
    res.render("login", { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: true, passwordReseted: false, user: userData });
  }

  else {
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      res.render("login", { nav: false, loggedIn: false, InvalidPassword: true, userNotFound: false, passwordReseted: false, user: userData });
    }
    else {
      req.session.username = user.username;
      req.session.loggedIn = true;
      req.session.avatar = user.avatar;
      res.redirect('/');
    }
  }



  // res.render({user})
  // res.send('User authenticated and logged in successfully')
  // res.redirect('/')
})

router.get('/dashboard', isAuthenticated, async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username }).populate('projects');
  const avatar = req.session.avatar
  res.render('dashboard', { avatar: avatar, nav: true, loggedIn: true, user });
});

router.get('/about', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('about', { nav: true, loggedIn: false, user });
});

router.get('/contact', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('contact', { nav: true, loggedIn: req.session.loggedIn, user, query: false });
});

router.post('/contact', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  const { firstName, lastName, email, query } = req.body
  await contactModel.create({
    user:user._id,
    firstName,
    lastName,
    email,
    query,
    queryResolved:""
  })
  res.render('contact', { nav: true, loggedIn: req.session.loggedIn, user, query: true });
});

router.get('/forgotpsswd', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('forgotpsswd', { nav: false, loggedIn: false, userNotFound: false, user });
});

router.post('/forgotpsswd', async (req, res) => {
  const { username, email } = req.body
  const userData = await userModel.findOne({ username: req.session.username });
  const user = await userModel.findOne({ $or: [{ username: username }, { email: email }] });
  console.log(user.email);

  if (!user) {
    res.render("forgotpsswd", { nav: false, loggedIn: false, userNotFound: true, user: userData });
  }

  else {
    req.session.username = user.username
    verificationCode = await sendMail(user.email)
    console.log(verificationCode);
    res.redirect('/verifypage');
  }

})

router.get('/verifypage', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('verifypage', { nav: false, loggedIn: false, invalidOtp: false, user });
});

router.post('/verifypage', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  const { otp_input1, otp_input2, otp_input3, otp_input4 } = req.body;
  let otp = otp_input1 + otp_input2 + otp_input3 + otp_input4;
  console.log("otp", otp);
  console.log(verificationCode);
  if (otp == verificationCode) {
    res.redirect("/createpsswd")
  }
  else {
    res.render('verifypage', { nav: false, loggedIn: false, invalidOtp: true, user });
  }
});

router.get('/createpsswd', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  res.render('createpsswd', { nav: false, loggedIn: false, user });
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
    res.render('login', { nav: false, loggedIn: false, InvalidPassword: false, userNotFound: false, passwordReseted: true, user })
  }

  catch (error) {
    res.status(500).send('Internal server error'); // Or redirect to an error page
  }

});

router.get('/dashboard/dashboard', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username }).populate('projects');
  const avatar = req.session.avatar
  res.render('newDashboard', { avatar: avatar, nav: false, loggedIn: true, user });
});

let routeTime = null;
let commentCount = 0;
let collabCount=0;

router.get('/dashboard/notification/comments', async function (req, res) {
  let commentData = [];
  commentCount=0
  const comments = await commentModel.find().populate("receiverDetail").populate("senderName")
  const user = await userModel.findOne({ username: req.session.username });
  if (comments) {
    comments.forEach((comment) => {
      const isSameUser = user._id.toString() === comment.receiverDetail.createdBy.toString();
      if (isSameUser) {
        if (routeTime) {
          // console.log("iftime",routeTime);
          // console.log("iftimestamp",comment.timestamp);
          if (routeTime < comment.timestamp) {
            commentCount++;
          }
        }
        else {
          // console.log("elsetime",new Date());
          // console.log("elsetimestamp",comment.timestamp);
          if (new Date() > comment.timestamp) {
            commentCount++;
          }
        }
        commentData.push(comment)
      }
    })
  }
  let previousTime=routeTime;
  routeTime = new Date()
  res.render('comments', { nav: false, loggedIn: true, user, commentData, commentCount,previousTime,collabCount });
});


let collabRouteTime = null;

router.get('/dashboard/notification/collaborations', async function (req, res) {
  let collabData=[]
  collabCount=0
  const user = await userModel.findOne({ username: req.session.username });
  const collaborations = await collaborationModel.find().populate("collabReqRec").populate("collabReqSend")
  if (collaborations) {
    collaborations.forEach((collab) => {
      const isSameUser = user._id.toString() === collab.collabReqRec.createdBy.toString();
      if (isSameUser) {
        if(collab.reqResponse == ""){
        if (collabRouteTime) {
          // console.log("ifcollabtime",collabRouteTime);
          // console.log("ifcollabtimestamp",collab.timestamp);
          if (collabRouteTime < collab.timestamp) {
            collabCount++;
          }
        }
        else {
          // console.log("elsecollabtime",new Date());
          // console.log("elsecollabtimestamp",collab.timestamp);
          if (new Date() > collab.timestamp) {
            collabCount++;
          }
        }
        collabData.push(collab)
      }
      }
    })
  }
  let previousTime=collabRouteTime;
  collabRouteTime = new Date()
  // console.log(collabRouteTime);
  // console.log(previousTime);
  res.render('collaborations', { nav: false, loggedIn: true, user,commentCount,collabData,collabCount,previousTime });
});

router.post('/dashboard/notification/collaborations', async function (req, res) {
  const data = req.body;
  try {
    // Find the collaboration document by ID and update the reqResponse field
    const collaboration = await collaborationModel.findOneAndUpdate(
      { _id: data.id },
      { $set: { reqResponse: data.response } },
      { new: true }   
    );

    if (!collaboration) {
      return res.status(404).send({ message: 'Collaboration not found' });
    }

    console.log('Updated Collaboration:', collaboration);
    res.json({ success: true, message: 'Collaboration updated successfully', collaboration });
  } catch (error) {
    console.error('Error updating collaboration:', error);
    res.status(500).send({ message: 'Failed to update collaboration', error: error.message });
  }
});


router.get('/dashboard/queries', async function (req, res) {
  const user = await userModel.findOne({ username: req.session.username });
  let contactData=[]
  const contacts = await contactModel.find();
  if (contacts) {
    contacts.forEach((contact) => {
      const isSameUser = user._id.toString() === contact.user.toString();
      if (isSameUser) {
        contactData.push(contact)
      }
    })
  }
  res.render('queries', { nav: false, loggedIn: true, user,contactData });
});

function isAuthenticated(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    res.redirect('/signup')
  }
}

router.get("/logout", function (req, res, next) {
  req.session.loggedIn = false;
  res.redirect('/')
});





module.exports = router;
