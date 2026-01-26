const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email format:"+ value);
            }
        }

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
    }, 
    gender:{
        type:String,

// validaors basically are functions that run when we try to save or update a field

        //by default validate function only runs when new value is set

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
        validate(value){
            if(value && !validator.isURL(value)){
                throw new Error("Invalid URL format for photoUrl:"+ value);
            }
        }
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

userSchema.methods.getJWT=function(){
    const user=this;
    const token= jwt.sign({userId:user._id}, "secretkey");
    return token;
};

userSchema.methods.validatePassword= async function(passwordInput){
    const user=this;
    const passwordHashFromDb=user.password;
    return await bcrypt.compare(passwordInput,passwordHashFromDb);
};

module.exports = mongoose.model('User', userSchema);