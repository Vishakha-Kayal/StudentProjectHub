const notificationSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"project"
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:"comment"
    }],
    collaboration:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"collaboration"
    }]
})