const express = require('express');
const profileRoutes = express.Router();
const {UserAuth} = require('../middleware/auth');

//profile api
profileRoutes.get('/profile',UserAuth, async (req, res) => {
    try{const user= req.user;
        res.status(200).send(user);
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

module.exports = profileRoutes;