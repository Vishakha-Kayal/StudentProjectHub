const mongoose = require("mongoose")
const users = require("./users")

const contactSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
   firstName: String,
   lastName: String,
   email:{
    type : String,
    required : true,
    lowercase:true,
    trim:true,
  },
   query:String,
   queryResolved:String,
   timestamp:
    { type: Date,
    default: Date.now }
})

module.exports = mongoose.model("contact", contactSchema)