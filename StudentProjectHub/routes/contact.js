const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema({
   firstName: String,
   lastName: String,
   email:{
    type : String,
    required : true,
    unique:true,
    lowercase:true,
    trim:true,
  },
   query:String,
   timestamp:
    { type: Date,
    default: Date.now }
})

module.exports = mongoose.model("contact", contactSchema)