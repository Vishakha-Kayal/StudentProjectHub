var express = require('express');
var router = express.Router();
var userModel = require("./users")

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/project', function(req, res) {
  res.render('project');
});

router.get('/uploadProject', function(req, res) {
  res.render('uploadProject');
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