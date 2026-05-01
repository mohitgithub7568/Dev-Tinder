const socket = require('socket.io');
const Chat = require('../models/chat');

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    });

    io.on('connection', (socket) => {
        //joinchat
        socket.on('joinChat', ({ fromUserId, toUserId }) => {
            const roomId = [fromUserId, toUserId].sort().join('_');
            socket.join(roomId);
            console.log(`User with ID: ${fromUserId} joined room: ${roomId}`);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });

        socket.on('sendMessage',async ({ firstName, fromUserId, toUserId, message }) => {
           
            try{
                const roomId = [fromUserId, toUserId].sort().join('_');
                console.log(`Message from ${firstName} : ${message}`);

                //save message to database here if needed
                let chat = await Chat.findOne({ participants: { $all: [fromUserId, toUserId] } });
                if (!chat) {
                     chat = new Chat({
                        participants: [fromUserId, toUserId],
                        messages: []
                    });
                    await chat.save();
                }
                
                chat.messages.push({
                    senderId: fromUserId,
                    text: message,

                });
                await chat.save();

                io.to(roomId).emit('receiveMessage', { firstName, fromUserId, toUserId, message, createdAt: new Date() }); 
            }
            catch(err){
                console.error('Error saving message to database:', err);
            }
            
        });
        
    });
};

module.exports = initializeSocket;