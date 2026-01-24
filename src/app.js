const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const User = require('./models/user');

app.use(express.json());

// post data of user on signup
app.post('/signup',async (req, res) => {
    const User1Data = new User(req.body);
   try {
        //validator for required fields
        const {firstName, email, password, age} = req.body;
        if(!firstName || !email || !password || !age){
            return  res.status(400).send("firstName, email, password and age are required fields");
        }
        //

        //validator for only 10 skills
        if(User1Data.skills && User1Data.skills.length >10){
            throw new Error("Skills cannot be more than 10");
        }
        //

        //validator for password length
        if(password.length <6){
            return res.status(400).send("Password must be at least 6 characters long");
        }
        //

        //validator for unique email
        const existingUser =  await User.findOne({email: email});
        if(existingUser){
            return res.status(400).send("Email already in use");
        }
        //
        
        const savedUser = await User1Data.save();
        res.status(201).send(savedUser);
   } catch (err) {
        res.status(500).send("Error saving user: " + err.message);
   }
});

//feed api
app.get('/feed', async (req, res) => {
    try{
        const users = await User.find({});
        res.status(200).send(users);
    }
    catch(err){
        res.status(500).send(err);
    }
});

// get user by id
app.get('/user/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).send("User not found");
        }
        
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send(err);
    }
});

//delete user by id in body
app.delete('/user', async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.body.id);
        if(!deletedUser){
            return res.status(404).send("User not found");
        }
        res.status(200).send(deletedUser);
    }
    catch(err){
        res.status(500).send(err);
    }
});

//update data from id
app.patch('/user/:userId',async (req,res)=>{ 
    const userdata = req.body;
    const userId = req.params.userId;
    try{
        // allowing valid updates only
        const allowedUpdates = ['lastName','age','gender','photoUrl','skills','about'];
        const requestedUpdates = Object.keys(userdata).every((update)=>allowedUpdates.includes(update));

        if(!requestedUpdates){
            throw new Error("Invalid updates requested");
        }
        if(userdata.skills && userdata.skills.length >10){
            throw new Error("Skills cannot be more than 10");
        }
        //

        const updatedUser = await User.findByIdAndUpdate(userId, userdata, {
            returnDocument:'after',
            runValidators:true
        });
        if(!updatedUser){
            return res.status(404).send("User not found");
        }
        res.status(200).send(updatedUser);
    }
    catch(err){
        res.status(500).send(err);
    }
})
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

