
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/signup', { name, email, password });
            setMessage(response.data);
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data);
            } else {
                setMessage("Please try again");
            }
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 font-poppins">
            <form onSubmit={handleSignup} className="bg-white p-8 rounded-lg shadow-md w-80">
                <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>
                <div className="mb-3">
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
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
                    Signup
                </button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};
export default Signup;