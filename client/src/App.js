import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <h1>Check out all of these posts!</h1>
      <PostList/>
    </div>
  );
}

export default App;
