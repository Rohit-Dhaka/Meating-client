// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/login', { email, password });
            const userId = response.data.userId; 
            localStorage.setItem('currentUserId', userId);
            setMessage(response.data);
            navigate('/home');
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data);
            } else {
                setMessage("Please try again");
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 font-poppins">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
                <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                    Login
                </button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:underline">
                        Signup
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
