const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    reviewContent : String,
    senderName:{
        type:mongoose.Schema.Types.ObjectId ,
        ref : "user"
    },
    recieverDetails:{
        type : mongoose.Schema.Types.ObjectId ,
        ref:"project"
    }
})


module.exports = mongoose.model("project",reviewSchema)