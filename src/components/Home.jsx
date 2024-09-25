// Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(''); // Assuming you have the current user ID stored somewhere

    useEffect(() => {
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
        try {
            const response = await axios.post('http://localhost:4000/user/send-friend-request', {
                senderId: currentUserId, // Replace with your current logged-in user ID
                receiverId: receiverId
            });
            alert(response.data);
        } catch (err) {
            console.error('Error sending friend request:', err);
            alert('Error sending friend request');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-poppins p-4">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <ul>
                    {users.map((user) => (
                        <li key={user._id} className="mb-2 p-2 border-b border-gray-300 flex justify-between items-center">
                            <span>{user.name} - {user.email}</span>
                            <button
                                className='border rounded-md py-1 px-3 bg-blue-500 text-white'
                                onClick={() => sendFriendRequest(user._id)}
                                disabled={user._id === currentUserId} // Prevent sending a request to yourself
                            >
                                Add Friend
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Home;



// // Home.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Home = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/alluser');
//                 setUsers(response.data);
//             } catch (err) {
//                 console.error('Error fetching users:', err);
//             }
//         };
//         fetchUsers();
//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-100 font-poppins p-4">
//             <h2 className="text-2xl font-semibold mb-4">All Users</h2>
//             <div className="bg-white p-4 rounded-lg shadow-md">
//                 <ul>
//                     {users.map((user) => (
//                         <li key={user._id} className="mb-2 p-2 border-b border-gray-300 ">
//                             {user.name} - {user.email}
//                             <button className='border  rounded-md py-1 px-3 text-end bg-blue-500 text-white '>Add frand</button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default Home;
