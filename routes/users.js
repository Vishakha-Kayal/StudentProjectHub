const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/StudentProjectHub')

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required: true,
    lowercase:true,
  },
  email: {
    type: String,
    required: true,
    lowercase:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    required:false
  },
  projects:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"project"
    }
  ]

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)