// App.js
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import FriendRequests from './components/FriendRequests';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext'; // Import UserProvider
import Chat from './components/Chat';


function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friend-requests" element={<FriendRequests />} />
        <Route path="/chat/:friendId" element={<Chat />} />
        


      </Routes>
    </UserProvider>
  );
}

export default App;
