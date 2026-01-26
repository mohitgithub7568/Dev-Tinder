const validator = require('validator');

const validateUserData = (req) => {
    if(!req.body.firstName || req.body.firstName.length > 30) {
        throw new Error("First name is required and should be less than 30 characters");
    }
    if(req.body.lastName && req.body.lastName.length > 30) {
        throw new Error("Last name should be less than 30 characters");
    }
    if(!req.body.email || !validator.isEmail(req.body.email)) {
        throw new Error("Valid email is required");
    }
    if(!req.body.password || !validator.isStrongPassword(req.body.password, {minLength:6})) {
        throw new Error("Password is required and should be strong");
    }
}


module.exports = validateUserData;
            