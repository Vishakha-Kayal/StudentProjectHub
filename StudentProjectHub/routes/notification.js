const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "project"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    collaborations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "collaboration"
    }],
    timestamp:
    {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("notification", notificationSchema)