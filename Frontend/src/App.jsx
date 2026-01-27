import { useState } from 'react'
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
import CreatPost from './pages/creatPost';
import UserProvider from './components/context/userContext';
import {Toaster} from 'react-hot-toast';


function App() {
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
             <Route path="/profile/:id" element={<Profile />} />
            <Route path="/chatbox" element={<ChatBox />} />
            <Route path="/createpost" element={<CreatPost />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/message" element={<Message />} />
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