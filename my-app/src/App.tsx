import React from 'react';
import './App.css';
import PostList from './components/Post/PostList';
import { PostHome } from './components/Post/PostHome';
import { PostView } from './components/Post/PostView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Post/Login';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import { Homebar } from './components/Post/Homebar';

function App() {
  return (
    <div className="wrapper">
      <Homebar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PostHome />} />
          <Route path="/post/:id" element={<PostView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;