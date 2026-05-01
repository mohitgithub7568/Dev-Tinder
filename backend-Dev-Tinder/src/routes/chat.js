const express = require('express');
const chatRouter = express.Router();
const { UserAuth } = require('../middleware/auth');
const Chat = require('../models/chat');

chatRouter.get('/chat/:toUserId',UserAuth, async (req, res) => {
     
    const userId = req.user._id;
    const { toUserId } = req.params;
    try{
        let chat = await Chat.findOne({ participants: { $all: [userId, toUserId] } }).populate({path:"messages.senderId", select:"firstName lastName"});
        if(!chat){
            chat = new Chat({
                participants: [userId, toUserId],
                messages: []
            });
            await chat.save();
        }
        res.json(chat);
    }
    catch(err){
        console.error('Error fetching chat:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = chatRouter;