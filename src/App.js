import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Modules/Homepage/Pages/HomePage';
import PostsPage from './Modules/Posts/Pages/PostsPage';
import PostDetailPage from './Modules/Posts/Pages/PostDetailPage';
function App() {
  return (
    <Router basename="/personalwebsite">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postName" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
