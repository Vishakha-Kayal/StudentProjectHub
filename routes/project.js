const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectTitle:String,
    projectDesc:String,
    technologyStack:String,
    projectCategory:String,
    universityName:String,
    projectImages:[],
    studentNames:[],
    studentStream:[],
    yearOfQualification : Number,
    user:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "user"
    },
    approvedProject : Boolean
})


module.exports = mongoose.model("project",projectSchema)