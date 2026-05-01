const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const cookieParser = require('cookie-parser');
const cors= require("cors")
require('dotenv').config();

const initializeSocket = require('./helpers/socket');
const http = require('http');

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const requestRoutes = require('./routes/request');
const userRoutes = require('./routes/user');
const paymentRouter = require('./routes/payment');
const chatRouter = require('./routes/chat');
require('./helpers/CronJobs');
//routes

app.use('/', authRoutes);
app.use('/', profileRoutes);
app.use('/', requestRoutes);
app.use('/', userRoutes);
app.use('/', paymentRouter);
app.use('/', chatRouter);

//initialize socket.io , which will be used for real-time notifications in the application
const server = http.createServer(app);
initializeSocket(server);

//connecting to database and starting server
connectDb()
.then(()=>{
    console.log("Database connected successfully");
    server.listen(process.env.PORT, ()=>{  
        console.log("Server is running on port", process.env.PORT);
    });
})
.catch((err)=>{
    console.log("Database connection failed", err);
});

