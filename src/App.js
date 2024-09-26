import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import FriendRequests from './components/FriendRequests';
import Navbar from './components/Navbar';

function App() {
  return (
    <>    
    <Navbar />
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/friend-requests' element={<FriendRequests />} />
    </Routes>
  </>
    
  );
}
export default App;
