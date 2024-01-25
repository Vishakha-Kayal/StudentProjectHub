const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/StudentProjectHub")

const userSchema = mongoose.Schema({
  username:String,
  password:String,
  email:String,
  projects:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"project"
  }
]
})

module.exports = mongoose.model("user",userSchema)