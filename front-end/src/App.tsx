import React from 'react';
import './App.css';
import PostList from './components/Post/PostList';
import { PostHome } from './components/Post/PostHome';
import { PostView } from './components/Post/PostView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  Login from './components/Post/Login';
import  Register from './components/Post/Register';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import Profile from './components/Post/Profile';
import { Homebar } from './components/Post/Homebar';


function App() {
  return (
    <div className="wrapper">
      <Homebar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PostHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:id" element={<PostView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;