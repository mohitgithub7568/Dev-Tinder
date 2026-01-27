const express= require('express');
const authRoutes= express.Router();
const User= require('../models/user');
const validateUserData= require('../helpers/validator');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

// post data of user on signup
authRoutes.post('/signup',async (req, res) => {
    
   try {
        //validation
        validateUserData(req);
        const {firstName, lastName, email, password,skills,age} = req.body;
        //password encryption
        const hashedPassword = await bcrypt.hash(password, 10);
        //creating user object and saving to db
        const User1Data = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            skills,
            age
        });

        const savedUser = await User1Data.save();
        res.status(201).send(savedUser);
   } catch (err) {
        res.status(500).send("Error saving user: " + err.message);
   }
});
// login api
authRoutes.post('/login', async (req, res) => {
    try{
        
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            throw new Error("User not found with email: " + email);
        }

        const isPasswordMatch = await user.validatePassword(password);

        if(isPasswordMatch){
            // generate jwt token
            const token = user.getJWT();
            res.cookie("token",token);
        res.status(200).send("Login successful");
        }
        else{
         throw new Error("Incorrect password");
        }
    }
    catch(err){
        res.status(500).send(err.message);
    } 
});

module.exports= authRoutes;