const jwt = require('jsonwebtoken');
const User = require('../models/user');


//middleware to check if user is authenticated
const UserAuth=async (req,res,next)=>{
    try{
    const {token}= req.cookies;
    if(!token){
        throw new Error("Unauthorized: No token provided");
    }
    //token has a data and secret key encoded
    const decodedMessage= jwt.verify(token,"secretkey");
    const userId=decodedMessage.userId;

    const user= await User.findById(userId);
    if(!user){
        throw new Error("Unauthorized: User not found");
    }
    req.user=user;
    next();
}
catch(err){
    return res.status(401).send("Unauthorized: Invalid token");
}
}

module.exports={UserAuth};