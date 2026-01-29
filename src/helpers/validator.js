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

const valdateProfileEditData = (req) => {
    const AllowedFields = ['firstName', 'lastName', 'email', 'age', 'gender','photoUrl','skills','about'];
    const fieldsToUpdate = Object.keys(req.body);
    const isValidOperation = fieldsToUpdate.every(
        (field) => AllowedFields.includes(field)
    );
    if(!isValidOperation) {
        throw new Error("Invalid updates!");
    }
};

const validateProfileNewPassword = (newPassword) => {
    if(!newPassword || !validator.isStrongPassword(newPassword, {minLength:6})) {
        throw new Error("New password is required and should be strong");
    }
}
module.exports = {  validateUserData, valdateProfileEditData, validateProfileNewPassword};