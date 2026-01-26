const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const User = require('./models/user');
const validateUserData = require('./helpers/validator');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {UserAuth} = require('./middleware/auth');

//middlewares
app.use(express.json());
app.use(cookieParser());



// post data of user on signup
app.post('/signup',async (req, res) => {
    
   try {
        //validation
        validateUserData(req);
        const {firstName, lastName, email, password,skills,age} = req.body;
        //password encryption
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);
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
app.post('/login', async (req, res) => {
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

//profile api
app.get('/profile',UserAuth, async (req, res) => {
    try{const user= req.user;
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});



//connecting to database and starting server
connectDb()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, ()=>{  
        console.log("Server is running on port 3000");
    });
})
.catch((err)=>{
    console.log("Database connection failed", err);
});

