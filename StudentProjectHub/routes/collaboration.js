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
   // collaborationDetails: String,
   // reqResponse:Boolean
})

module.exports=mongoose.model("collaboration",collaborationSchema)