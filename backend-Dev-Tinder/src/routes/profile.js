const express = require('express');
const profileRoutes = express.Router();
const {UserAuth} = require('../middleware/auth');
const { valdateProfileEditData, validateProfileNewPassword} = require('../helpers/validator');
const bcrypt = require('bcrypt');

//profile view api
profileRoutes.get('/profile/view',UserAuth, async (req, res) => {
    try{const user= req.user;
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});
//profile edit api
profileRoutes.patch("/profile/edit",UserAuth, async (req, res) => {
    try{
        valdateProfileEditData(req);
        const loggedUser= req.user;
        const DataGiven= Object.keys(req.body);
        DataGiven.forEach((field)=>{
            loggedUser[field]= req.body[field];
        });
        await loggedUser.save();
        res.json({message:loggedUser.firstName + " your profile updated successfully"});

    }
    catch(err){
        res.status(500).send(err.message);
    }
});
//profile password change api
profileRoutes.patch("/profile/edit-password",UserAuth, async (req, res) => {
    try{
        const loggedUser= req.user;
        const {oldPassword, newPassword}= req.body;
        const isMatch=await bcrypt.compare(oldPassword, loggedUser.password);
        if(!isMatch) {
            throw new Error("Old password is incorrect");
        }
        else{
            validateProfileNewPassword(newPassword);
            const newHashedPassword= await bcrypt.hash(newPassword,10);
            loggedUser.password=newHashedPassword;
            await loggedUser.save();
            res.json({message:"Password updated successfully"});
        }
    }
    catch(err){
        res.status(500).send(err.message);
    }
});


module.exports = profileRoutes;