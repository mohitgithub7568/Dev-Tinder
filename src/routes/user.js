const express= require('express');
const userRoutes= express.Router();
const {UserAuth}= require('../middleware/auth');
const ConnectionRequestModel= require('../models/connectionRequests');
const { connection } = require('mongoose');

//get all pending connection requests received by the logged-in user
userRoutes.get('/user/requests/received',UserAuth, async (req, res) => {
    try{
        const loggedUser= req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedUser._id,
            status:"interested"
        }).populate('fromUserId', "firstName lastName age gender photoUrl");

        res.json({data: connectionRequests});
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
//get all connections
userRoutes.get('/user/connections', UserAuth, async (req, res) => {
    try{

        const loggedUser= req.user;

        const connections = await ConnectionRequestModel.find({
            $or:[
                {fromUserId: loggedUser._id, status:"accepted"},
                {toUserId: loggedUser._id, status:"accepted"}
            ]
        }).populate('fromUserId toUserId', "firstName lastName");

        //returning the connected user details only if the fromUserId is not the logged-in user then return fromUserId else return toUserId
        const data = connections.map((row) => {
            if(row.fromUserId._id.toString() !== loggedUser._id.toString()){
                return row.fromUserId;
            }   
            else{
                return row.toUserId;
            }
        });

        res.json({data});
        
        
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports= userRoutes;