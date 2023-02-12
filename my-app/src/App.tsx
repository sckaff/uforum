import React from 'react';
import './App.css';
import PostList from './components/Post/PostList';
import { PostHome } from './components/Post/PostHome';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './components/Post/Login';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PostHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;