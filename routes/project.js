const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    projectTitle: {
        type: String,
        required: true
    },
    projectCategory: String,
    projectDes: String,
    projectImages: [{
        type: String
    }],
    universityName:String,
    universityLogo:String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    approved:{
        type:Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model("project", projectSchema)