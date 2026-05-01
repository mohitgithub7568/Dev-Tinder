import React from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import createSocketConnection from '../utils/socket'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const Chat = () => {
    //this will hold the current message being typed by the user
    const [message, setMessage] = useState('');
    //this will hold all the messages in the chat
    const [messages, setMessages] = useState([]);
    const User = useSelector((state) => state.user.user);
    const toUserId = useParams().toUserId;

    const fetchChatData = async () => {
        try {
            const chat = await axios.get(BASE_URL + `/chat/${toUserId}`,{withCredentials:true});
            const formattedMessages = chat.data.messages.map((msg) => ({
                firstName: msg.senderId.firstName,
                fromUserId: msg.senderId._id,
                toUserId: toUserId,
                message: msg.text,
                createdAt: msg.createdAt
            }));
            setMessages(formattedMessages);
        } catch (err) {
            console.error('Error fetching chat data:', err);
        }
    };

    const sendmessage = () => {
        const socket = createSocketConnection();
        socket.emit('sendMessage', { firstName: User.firstName, fromUserId: User._id, toUserId, message });
        setMessage('');
    }
    useEffect(() => {
        fetchChatData();
    }, []);

    useEffect(() => {
        if(!User){
            return;
        }
        const socket = createSocketConnection();
        socket.emit('joinChat', { fromUserId: User?._id, toUserId });

        socket.on('receiveMessage', ({ firstName, fromUserId, toUserId, message, createdAt }) => {
            setMessages((messages) => [...messages, { firstName, fromUserId, toUserId, message ,createdAt}]); ;
        }); 

        return () => {
            socket.disconnect();
        };
    }, [User?._id, toUserId]);

  return (
    <div className='mx-auto w-full max-w-2xl px-4 py-6 lg:px-8 lg:py-10'>
        <h1 className='mb-6 text-2xl font-bold text-slate-100'>Chat with {User?.firstName}</h1>

        <div className='flex flex-col gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-slate-100 shadow-xl h-[400px]'>
            <div className='flex-1 space-y-3 overflow-y-auto rounded-xl bg-slate-950/40 p-3'>
                {messages.map((item, index) => (
                    //minimal timamestamp formatting on left of each message
                    <div key={index} className={`flex flex-col ${item.fromUserId === User?._id ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-xs rounded-lg px-4 py-2 text-sm ${item.fromUserId === User?._id ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-100'}`}>
                            {item.message}
                        </div>
                        <span className='text-xs text-slate-400 mt-1'>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                ))}
            </div>

            <div className='mt-auto flex items-center gap-3'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type='text'
                    placeholder='Type your message...'
                    className='flex-grow rounded-md border border-white/10 bg-slate-700 px-4 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2'
                />
                <button className='rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400' 
                onClick={sendmessage}>
                    Send
                </button>

            </div>
        </div>
    </div>

   
  )
}

export default Chat
