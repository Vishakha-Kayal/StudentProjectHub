const mongoose = require("mongoose");

const collaborationSchema = mongoose.Schema({
    collabReqRec : {
        type:mongoose.Schema.Types.ObjectId ,
        ref : "project"
    },
    collabReqSend : {
        type:mongoose.Schema.Types.ObjectId ,
        ref : "user"
    },
    reqResponse:Boolean 

})


module.exports = mongoose.model("collaboration",collaborationSchema)