const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentStream: { type: String, required: true },
    yearOfQualification: { type: Number, required: true }
});

const projectSchema = new mongoose.Schema({
    projectTitle: String,
    projectDescription: String,
    universityName: String,
    projectCategory: String,
    projectImages: [String]
    ,
    universityLogo:String,
    student: [studentSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    collaborations:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaboration"
    }],
    approvedProject: Boolean
}, { timestamps: true })

module.exports = mongoose.model("project", projectSchema)