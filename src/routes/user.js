const express= require('express');
const userRoutes= express.Router();
const {UserAuth}= require('../middleware/auth');
const ConnectionRequestModel= require('../models/connectionRequests');

userRoutes.get('/user/requests/received',UserAuth, async (req, res) => {
    try{

    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports= userRoutes;