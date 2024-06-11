const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(`${process.env.MONGODB_URL}/StudentProjectHub`);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: false,
    trim: true,
  },
  universityEmail: {
    type: String,
    required: false,
  },
  hasNewComments: { type: Boolean, default: false },
  hasNewCollaboration: { type: Boolean, default: false },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project"
    }
  ]
}, { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)