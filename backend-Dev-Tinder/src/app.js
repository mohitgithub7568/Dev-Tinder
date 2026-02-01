const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const cookieParser = require('cookie-parser');
const cors= require("cors")
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/Profile');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user');
//routes

app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', requestRoutes);
app.use('/', userRoutes);
//connecting to database and starting server
connectDb()
.then(()=>{
    console.log("Database connected successfully");
    app.listen(4000, ()=>{  
        console.log("Server is running on port 4000");
    });
})
.catch((err)=>{
    console.log("Database connection failed", err);
});

