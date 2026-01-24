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

// validaors basically are functions that run when we try to save or update a field

        //by deafult validate function only runs when new value is set

        //but we can force it to run on update also by setting runValidators:true in options of findByIdAndUpdate
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error("Gender must be male, female or other");
            }
        },
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
}
,

{timestamps:true});

module.exports = mongoose.model('User', userSchema);