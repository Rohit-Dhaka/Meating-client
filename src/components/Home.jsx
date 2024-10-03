import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);
    useEffect(() => {
        const userId = localStorage.getItem("currentUserId");
        setCurrentUserId(userId);
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:4000/alluser');
                setUsers(response.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        };
        fetchUsers();
    }, []);

    const sendFriendRequest = async (receiverId) => {
        if (!currentUserId) {
            alert("You must be logged in to send friend requests.");
            return;
        }
        try {
            await axios.post('http://localhost:4000/user/send-friend-request', {
                senderId: currentUserId,
                receiverId,
            });
            alert('Friend request sent!');                                        
        } catch (err) {
            console.error('Error sending friend request:', err);
            alert('Error sending friend request.');
        }
    };        
    return (
        <div className="min-h-screen bg-gray-100 font-poppins p-4">
            <Link to='/friend-requests'>FriendRequests </Link>
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className="mb-2 p-2 border-b border-gray-300">
                            {user.name} - {user.email}
                            {user._id !== currentUserId && (
                                <button className='ml-4 border rounded-md py-1 px-3 text-end bg-blue-500 text-white'
                                    onClick={() => sendFriendRequest(user._id)}>
                                    Add Friend
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Home;
