import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Chat = () => {
    const { friendId } = useParams();
    const currentUserId = localStorage.getItem("currentUserId");
    const currentUserName = localStorage.getItem("currentUserName"); // Assuming you store the user's name in localStorage
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/chat/${currentUserId}/${friendId}`);
                setMessages(response.data);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };
        fetchMessages();
    }, [currentUserId, friendId]);


    

    const sendMessage = async () => {
        if (!message.trim()) return;
        try {
            await axios.post('http://localhost:4000/chat/send', {
                senderId: currentUserId,
                senderName: currentUserName, // Include the sender's name
                receiverId: friendId,
                message,
            });
            setMessages([...messages, { senderId: currentUserId, senderName: currentUserName, text: message }]);
            setMessage('');
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-poppins p-4">
            <h2 className="text-2xl font-semibold mb-4">Chat with Friend</h2>
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.senderId === currentUserId ? 'text-right' : 'text-left'}`}>
                        <span className={`block text-sm ${msg.senderId === currentUserId ? 'text-blue-500' : 'text-gray-500'}`}>
                            {msg.senderId === currentUserId ? currentUserName : msg.senderName || 'Friend'}
                        </span>
                        <span className={`inline-block ${msg.senderId === currentUserId ? 'bg-blue-200' : 'bg-gray-200'} p-2 rounded-lg`}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <input
                type="text"
                className="w-full p-2 border rounded-md"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={sendMessage}>
                Send
            </button>
        </div>
    );
};

export default Chat;
