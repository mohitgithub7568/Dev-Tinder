const express = require('express');
const requestRoutes = express.Router();
const {UserAuth} = require('../middleware/auth');
const ConnectionRequestModel = require('../models/connectionRequests');
const User = require('../models/user');
//send connection request api
requestRoutes.post('/request/send/:status/:toUserId', UserAuth, async (req, res) => {
    try{
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status = req.params.status;

        //allowing only 'interested' and 'ignored' statuses
        const AllowedRequestStatuses = ['interested','ignored'];
        if(!AllowedRequestStatuses.includes(status)){
            return res.status(400).json({message: "Invalid request status"});
        }

        //check if toUserId exists or not
        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found"});
        }

        //prevent sending request to oneself
        if(fromUserId.toString() === toUserId){
            return res.status(400).json({message: "Cannot send request to oneself"});
        }
         
        //checking if a request already exists
        const existingRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });
        if(existingRequest){
            return res.status(400).json({message: "Connection request already exists"});
        }

        //create a new connection request
        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data=await connectionRequest.save();
        res.json({message: "Connection request sent successfully", data});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
requestRoutes.post('/request/review/:status/:requestId', UserAuth, async (req, res) => {
    try{
        const loggedUserId= req.user._id;
        const status = req.params.status;
        const requestId = req.params.requestId
        
        //allowing only 'accepted' and 'rejected' statuses
        const AllowedReviewStatuses = ['accepted', 'rejected'];
        if(!AllowedReviewStatuses.includes(status)){
            return res.status(400).json({message: "Invalid review status"});
        }

        //checking if the connection request exists
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedUserId,
            status:"interested"
        });
        if(!connectionRequest){
            return res.status(400).json({message: "No pending connection request found to review"});
        }

        //update the status of the connection request
        connectionRequest.status = status;
        const data= await connectionRequest.save();
        res.json({message: "Connection request reviewed successfully", data});
        
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
module.exports = requestRoutes;