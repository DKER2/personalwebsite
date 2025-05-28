import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Modules/Homepage/Pages/HomePage.jsx';
import PostsPage from './Modules/Posts/Pages/PostsPage.jsx';
import PostDetailPage from './Modules/Posts/Pages/PostDetailPage.jsx';
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
