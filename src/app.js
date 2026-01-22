const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const User = require('./models/user');

app.use(express.json());

// post data of user on signup
app.post('/signup',async (req, res) => {
    const User1Data = new User(req.body);
   try {
        const savedUser = await User1Data.save();
        res.status(201).send(savedUser);
   } catch (err) {
        res.status(500).send(err);
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
app.patch('/user',async (req,res)=>{ 
    const userdata = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(userdata.id, userdata,{
            returnDocument:'after',
            runValidators:true
        });
        res.status(200).send(updatedUser);
    }
    catch{
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

