import React from 'react';
import './App.css';
import PostList from './components/Post/PostList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <PostList />
    </div>
  );
}

export default App;