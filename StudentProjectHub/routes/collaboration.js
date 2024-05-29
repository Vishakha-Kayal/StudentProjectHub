const mongoose =require("mongoose")

const collaborationSchema = new mongoose.Schema({
   collabReqRec:{
    type : mongoose.Schema.Types.ObjectId ,
    ref  : "project"
   },
   collabReqSend:{
    type : mongoose.Schema.Types.ObjectId ,
    ref  : "user"
   },
   reqResponse:String,
   timestamp:
    { type: Date,
    default: Date.now }
   // collaborationDetails: String,
})

module.exports=mongoose.model("collaboration",collaborationSchema)