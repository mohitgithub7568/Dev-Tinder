const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        // reference to User model
        ref: 'User'

    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        // reference to User model
        ref: 'User'
    },
    status:{
        type : String,
        required:true,
        enum:{
            values: ['interested','ignored', 'accepted', 'rejected'],
            message: '{VALUE} is not supported'
        },
        default: 'pending'

    }
},{
    timestamps:true
});
connectionRequestSchema.index({fromUserId:1, toUserId:1});

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = ConnectionRequestModel;