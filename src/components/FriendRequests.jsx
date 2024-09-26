import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FriendRequests = () => {
    const [requests, setRequests] = useState([]);
    const currentUserId = localStorage.getItem("currentUserId");
    useEffect(() => {
        const fetchFriendRequests = async () => {
            if (!currentUserId) return;
            try {
                const response = await axios.get(`http://localhost:4000/user/${currentUserId}/friend-requests`);
                setRequests(response.data);
            } catch (err) {
                console.error('Error fetching friend requests:', err);
            }
        };
        fetchFriendRequests();
    }, [currentUserId]);

    const acceptRequest = async (senderId) => {
        try {
            await axios.post('http://localhost:4000/user/accept-friend-request', {
                userId: currentUserId,
                senderId,
            });
            alert('Friend request accepted!');
            setRequests(requests.filter((req) => req._id !== senderId));
        } catch (err) {
            console.error('Error accepting friend request:', err);
        }
    };

    return (
        <div className=" bg-gray-100 font-poppins p-4">
            <Link to='/home'>Home </Link>  
            
            <h2 className="text-2xl font-semibold mb-4">Friend Requests</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {requests.length === 0 ? (
                    <p>No friend requests</p>
                ) : (
                    <ul>
                        {requests.map((request) => (
                            <li key={request._id} className="mb-2 p-2 border-b border-gray-300">
                                {request.name} - {request.email}
                                <button
                                    className='ml-4 border rounded-md py-1 px-3 text-end bg-green-500 text-white'
                                    onClick={() => acceptRequest(request._id)}
                                >
                                    Accept
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FriendRequests;