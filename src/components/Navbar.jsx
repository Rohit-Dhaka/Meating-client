// Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Logo from '../assets/images/webp/download.png';

const Navbar = () => {
    const [userName, setUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState(localStorage.getItem("currentUserId"));
    const navigate = useNavigate(); // Hook for programmatic navigation

    useEffect(() => {
        const fetchUserName = async () => {
            if (currentUserId) {
                try {
                    const response = await axios.get(`http://localhost:4000/user/${currentUserId}`);
                    setUserName(response.data.name);
                } catch (err) {
                    console.error('Error fetching user data:', err);
                }
            }
        };
        fetchUserName();
    }, [currentUserId]);

    const handleLogout = () => {
        localStorage.removeItem('currentUserId');
        setUserName('');
        setCurrentUserId(null); // Update state to reflect the logout
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
                <Link to="/" className="text-lg font-bold">MyApp</Link>
            </div>
            <div className="flex items-center space-x-4">
                {!currentUserId ? ( // Check if user is logged in
                    <>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/home" className="hover:underline">Home</Link>
                        <Link to="/friend-requests" className="hover:underline">Friend Requests</Link>
                        <div className="bg-white text-blue-500 px-3 py-1 rounded-md">
                            {userName}
                        </div>
                        <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;





// // Navbar.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Logo from '../assets/images/webp/download.png'

// const Navbar = () => {
//     const [userName, setUserName] = useState('');
//     const currentUserId = localStorage.getItem("currentUserId");

//     useEffect(() => {
//         const fetchUserName = async () => {
//             if (currentUserId) {
//                 try {
//                     const response = await axios.get(`http://localhost:4000/user/${currentUserId}`);
//                     setUserName(response.data.name);
//                 } catch (err) {
//                     console.error('Error fetching user data:', err);
//                 }
//             }
//         };
//         fetchUserName();
//     }, [currentUserId]);

//     return (
//         <nav className="bg-blue-500 p-4 text-white flex justify-between items-center">
//             <div className="flex items-center">
//                 <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" /> {/* Add your logo path */}
//                 <Link to="/" className="text-lg font-bold">MyApp</Link>
//             </div>
//             <div className="flex items-center space-x-4">
//                 <Link to="/home" className="hover:underline">Home</Link>
//                 <Link to="/friend-requests" className="hover:underline">Friend Requests</Link>
//                 {userName && (
//                     <div className="bg-white text-blue-500 px-3 py-1 rounded-md">
//                         {userName}
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
