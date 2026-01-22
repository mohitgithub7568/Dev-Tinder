const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:30,
        
    },
    lastName:{
        type:String,
        maxLength:30,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        minLength:6, 
    },
    age:{
        type:Number,
        min:10,
        max:100,
        required:true,
         
    }, 
    gender:{
        type:String,
    },
    photoUrl:{
        type:String,
        default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    skills:{
        type:[String],
    },
    about:{
        type:String,
    }
});

module.exports = mongoose.model('User', userSchema);