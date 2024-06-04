const { mongoose } = require("mongoose");

const contactSchema = new mongoose.Schema({
    firstName:"String",
    lastName:"String",
    email:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
    },
    userIssue:{
        type:String,
    },
    queryResolved:{
        type:String,
    }
})

module.exports = mongoose.model("contact",contactSchema)