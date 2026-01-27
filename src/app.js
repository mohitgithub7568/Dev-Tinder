const express = require('express');
const { connectDb } = require('./config/database');
const app= express();
const cookieParser = require('cookie-parser');
//middlewares
app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/Profile');

app.use('/', authRoutes);
app.use('/', profileRoutes);

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

