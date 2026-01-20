const express= require('express');

const app= express();

const {isAuth,UserAuth}= require('./middleware/auth');

app.use("/admin",isAuth)

app.get("/user/login",(req,res,next)=>{
    console.log("user login route called");
    res.send("user logged in");
})

app.get("/admin/getalldata",(req,res,next)=>{
    console.log("getalldata route called");
    res.send("all data reached");
})
app.get("/admin/deleteuser",(req,res,next)=>{
    console.log("delete a user route called");
    res.send("delete user");
})
app.get("/admin/deleteall",(req,res,next)=>{
    console.log("delete all user route called");
    res.send("all data deleted");
})

app.use("/user",UserAuth,(req,res)=>{
    console.log("at user route request");
    res.send("response to a user");
})

app.listen(3000,()=>{
    console.log("connected successfully");
})