const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stream: { type: String, required: true },
    yearOfQualification: { type: Number, required: true }
});

const projectSchema = new mongoose.Schema({
    projectTitle: String,
    projectDesc: String,
    universityName: String,
    technologyStack: String,
    projectCategory: String,
    projectImages: [
        { type: String }
    ],
    universityLogo:String,
    student: [studentSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    approvedProject: Boolean
}, { timestamps: true })

module.exports = mongoose.model("project", projectSchema)