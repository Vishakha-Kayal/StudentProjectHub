const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
   reviewContent: String,
   senderName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   },
   receiverDetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
   },
   timestamp:
    { type: Date,
    default: Date.now }
})

module.exports = mongoose.model("review", reviewSchema)