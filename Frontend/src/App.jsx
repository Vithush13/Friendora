import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './index.css'
import './App.css'
import Home from './pages/home';
import Friends from './pages/friends';
import Message from './pages/message';
import Login from './user/login';
import SignUp from './user/signUp';
import Profile from './pages/profile';
import ChatBox from './pages/chatBox';
import CreatePost from './pages/createPost';
import UserProvider from './components/context/userContext';
import {Toaster} from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import { fetchUser } from './features/user/userSlice';
import Discover from './pages/discover';
import { fetchConnections } from './features/connections/connectionSlice';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUser(token));
      dispatch(fetchConnections(token));
    }
  }, [dispatch]);
  return (
     <UserProvider>
      <div>
    <Router>
         <Toaster/>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
             <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/chatbox/:userId" element={<ChatBox />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/message" element={<Message />} />
            <Route path="/discover" element={<Discover />} />
          </Routes>
    </Router>
    </div>
    </UserProvider>
  )
}

export default App



const Root =() =>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ?(
    <Navigate to ="/home" />
  ):(
    <Navigate to="/login"/>
  )
        

}