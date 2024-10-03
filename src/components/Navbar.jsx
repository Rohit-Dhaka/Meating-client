import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Logo from '../assets/images/webp/download.png';
const Navbar = () => {
    const { userName, setUserName } = useUser();
    const currentUserId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('currentUserId');
        setUserName(''); 
        navigate('/login'); 
        window.location.reload();         
    };
    return (
        <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
                <Link to="/" className="text-lg font-bold">MyApp</Link>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/signup" className="hover:underline">Signup</Link>                
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/friend-requests" className="hover:underline">Friend Requests</Link>                
                <Link to="/chat/:friendId" className="hover:underline">chat</Link>                                
                {userName && (
                    <div className="bg-white text-blue-500 px-3 py-1 rounded-md">
                        {userName}
                    </div>
                )}
                <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600">
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
